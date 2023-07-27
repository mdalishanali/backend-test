import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { InvitedUsers, Company } from '../../../db';
import { EmailService } from '../../../services/email';
import * as StandardError from 'standard-error';
import { config } from '../../../config';

const JWT_SECRET = config.JWT_SECRET ? config.JWT_SECRET : 'i am a tea pot';

const createInviteMailData = (email: string, protocol: string) => {
  const host = `${protocol}://${config.HOST}`;
  const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email }, JWT_SECRET);
  const link = `${host}/accept-invite/?inviteToken=${token}`;
  const mailData = {
    email,
    link: link,
  };
  return mailData;
};

export class InviteUsersHelpers {

  public static cancelInvite = async (inviteId: string, userId: string) => {
    const emailService = new EmailService();
    const existingInvitation = await InvitedUsers.findOne({
      _id: inviteId, userId
    });
    if (existingInvitation) {
      const data = await InvitedUsers.updateOne({ _id: inviteId }, { cancelled: true });
      return {
        message: `Invitation cancelled successfully`,
      };
    } else {
      throw new StandardError({
        message: `Invalid invite`,
        code: status.CONFLICT,
      });
    }
  }

  public static resendInvitation = async (email: string, userId: string, protocol: string) => {
    const emailService = new EmailService();
    const existingInvitation = await InvitedUsers.findOne({
      invitedEmail: email, userId
    });
    if (existingInvitation) {
      const data = await InvitedUsers.updateOne({ invitedEmail: email }, { expiry: new Date(Date.now() + 1 * (60 * 60 * 1000)), cancelled: false });
      const mailData = createInviteMailData(email, protocol);
      emailService.inviteUserEmail(mailData);
      return {
        message: `Invitation email re-sent successfully to ${email}`,
      };
    } else {
      throw new StandardError({
        message: `${email} is not invited`,
        code: status.CONFLICT,
      });
    }
  }

  public static updateInvite = async (inviteId: string, update) => {
    return await InvitedUsers.updateOne({ _id: inviteId }, update, { new: true });
  }

  public static inviteUsers = async (emails: { role: string, email: string }[], userId: string, protocol: string) => {
    const emailService = new EmailService();

    const asyncFilter = async (emailsList, predicate) => {
      const results = await Promise.all(emailsList.map(predicate));

      return emailsList.filter((_v, index) => results[index]);
    };

    const alreadyInvited = await asyncFilter(emails, async (emailObj) => {
      let isInvited = false;
      const existingInvitation = await InvitedUsers.findOne({
        invitedEmail: emailObj.email
      });
      if (existingInvitation) {
        isInvited = true;
      } else {
        const inviation = {
          invitedEmail: emailObj.email,
          userId,
          role: emailObj.role
        };
        const data = await InvitedUsers.create(inviation);
        const mailData = createInviteMailData(emailObj.email, protocol);
        emailService.inviteUserEmail(mailData);
      }
      if (isInvited) {
        return true;
      }
    });

    const alreadyInvitedEmails = alreadyInvited.map((item) => {
      return item.email;
    });

    return {
      message: `Mail with invite sent successfully ${alreadyInvitedEmails.length > 0 ? `except for ${alreadyInvitedEmails.toString()} as they are already invited` : ''}`,
    };
  }

  public static invitedUsers = async (userId: string) => {
    const pendingInvites = await InvitedUsers.find({
      userId,
      isAccepted: false,
      cancelled: false,
      expiry: { $gt: Date.now() },
      companyId: { $exists: false }
    });

    const expiredInvites = await InvitedUsers.find({
      userId,
      isAccepted: false,
      companyId: { $exists: false },
      $or: [
        { expiry: { $lt: Date.now() } },
        { cancelled: true }
      ]
    });

    const acceptedInvites = await InvitedUsers.aggregate([
      {
        $match: {
          isAccepted: true,
          userId,
          companyId: { $exists: false }
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$userId', email: '$invitedEmail' },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $eq: ['$referredBy', '$$userId'] } },
                  { $expr: { $eq: ['$email', '$$email'] } },
                ]
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1
              },
            },
          ],
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo'
      }
    ]);
    return { pendingInvites, acceptedInvites, expiredInvites };
  }

  public static inviteSingleUser = async (inviteUser, companyId: string, userId: string, protocol: string) => {
    const existingInvitation = await InvitedUsers.findOne({
      invitedEmail: inviteUser.email
    });

    if (existingInvitation) {
      throw new StandardError({
        message: `Already invited`,
        code: status.CONFLICT,
      });
    }
    let companyIdUser = companyId;
    if (inviteUser.companyId) {
      companyIdUser = inviteUser.companyId;
    }
    const invitation = {
      invitedEmail: inviteUser.email,
      companyId: companyIdUser, userId,
      role: "Moderator",
      permissions: inviteUser.permissions
    };

    const emailService = new EmailService();
    const data = await InvitedUsers.create(invitation);
    const mailData = createInviteMailData(inviteUser.email, protocol);
    await emailService.inviteUserEmail(mailData);
    return data;
  }

  public static findAllInvitedUser = async (query, user) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 15;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const filter = query.filter;
    const allFilter: any = {};

    const matchQuery = {
      $match: allFilter
    }
    if (user.roles === 'Admin') {
      allFilter['companyId'] = user.companyId._id;
    }

    const paginationQuery = {
      $facet: {
        data: [
          {
            $skip: skips,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: "count",
          },
        ],
      },
    }

    let aggregatePipeline = [
      matchQuery,
      paginationQuery
    ]

    if (searchValue.length) {
      const searchQuery = { $match: { $text: { $search: searchValue } } };
      aggregatePipeline = [searchQuery, ...aggregatePipeline]
    }
    const data = await InvitedUsers.aggregate(aggregatePipeline)
    return data;
  }
}
