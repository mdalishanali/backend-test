
      // NPM Dependencies
      import * as status from 'http-status';
      import * as StandardError from 'standard-error';
      const { ObjectId } = require('mongodb');


      // Internal Dependencies
      import { Todo } from '../../db';
      export class TodoHelpers {
    
      public static findOne = async (id: string, companyId: string) => {
        return await Todo
          .findOne({ _id: id, companyId })
          .populate('');
      };
      
    public static findAll = async (query,user) => {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.pageSize) || 50;
      const skips = (page - 1) * limit;
      const searchValue = query.searchValue;
      const companyId = query.companyId;
      const allFilter: any = {};
      
      
    const matchQuery = {
      $match: allFilter
    }
    
    if (companyId) {
        allFilter['companyId'] = ObjectId(companyId)
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
    const data = await  Todo.aggregate(aggregatePipeline)
    return data;
  }
    public static findAndUpdate = async ({ id, update }) => {
  return await Todo
        .findByIdAndUpdate(id, update, { new: true })
    .populate('');
}
public static create = async (document) => {
  return await Todo
                .create(document);
};
public static softDelete = async (id, user) => {
  const data = await Todo
        .findByIdAndUpdate(id, { isVisible: false }).setOptions({
    deleteOperation: true,
    user,
  });
  return data
}
public static authenticate = (doc, user) => {
        if (doc.companyId.toString() !== user.companyId._id.toString()) {
          throw new StandardError({ message: 'This document does not belong to the user', code: status.UNAUTHORIZED })
        }
      }}
    
    const dateFilterQuery = (filter,key)=>{
      if (filter?.from && filter?.to) {
        const dateQuery = {
          [key]: {
            $gte: new Date(filter.from),
            $lt: new Date(filter.to)
          }
        }
        return dateQuery;
      }
    }
    
    const numberQuery = (filter, key) => {
      if (filter?.min && filter?.max) {
        const numberQuery = {
          [key]: {
            $gte: parseInt(filter.min),
            $lte: parseInt(filter.max),
          }
        }
        return numberQuery;
      }
    }
    
    const regexSearchQuery = (key, value) => {
      return { [key]: { $regex: '_*' + value + "_*", $options: "i" } }
    }
    