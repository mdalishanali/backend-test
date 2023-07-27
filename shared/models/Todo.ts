import * as mongoose from 'mongoose';

export interface Todo {
    _id ?: mongoose.Schema.Types.ObjectId;

  name: String;
  isCompleted: Boolean
}
