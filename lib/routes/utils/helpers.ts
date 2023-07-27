import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { InvitedUsers, } from '../../db';




export class UtilsHelpers {
  public static findSidebarItems = async (email) => {
    const data = await InvitedUsers.findOne({ invitedEmail: email });
    return data;
  };

}
