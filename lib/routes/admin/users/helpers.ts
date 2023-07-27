const { ObjectId } = require('mongodb');

// Internal Dependencies
import { User as users } from '../../../db';
export class AdminUsersHelpers {
  public static findAll = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.pageSize) || 10;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const filter = query.filter;
    const companyId = query.companyId;


    let andQuery = [];

    if (filter?.date) {
      const dateQuery = {
        createdAt: {
        }
      }
      if (filter?.date.from) {
        dateQuery.createdAt['$gte'] = new Date(filter.date.from)
      }
      if (filter?.date.to) {
        dateQuery.createdAt['$lte'] = new Date(filter.date.to)
      }
      andQuery.push(dateQuery);
    }

    if (filter?.role) {
      const roleQuery = {
        roles: {
          $eq: filter?.role
        }
      }
      andQuery.push(roleQuery);
    }

    const paginationStage = {
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

    let aggregatePipeline = [];

    if (andQuery.length) {
      const matchStage = {
        $match: {
          $and: andQuery
        }
      }
      aggregatePipeline.push(matchStage)
    }

    if (companyId) {
      const matchStage = {
        $match: {
          companyId: ObjectId(companyId),
        }
      }
      aggregatePipeline.push(matchStage)
    }
    
    if (searchValue?.length) {
      const searchStage = { $match: { $text: { $search: searchValue } } };
      aggregatePipeline = [searchStage, ...aggregatePipeline]
    }
    const data = await users.aggregate([...aggregatePipeline, paginationStage])
    return data;
  }

  public static findOne = async (id: string) => {
    return await users.findById(id);
  }
}
