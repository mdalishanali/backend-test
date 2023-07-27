
      
      import * as mongoose from 'mongoose';
      const ObjectId = mongoose.Schema.Types.ObjectId;
      
      export const TodoSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: "false",
        required: true
    },
    companyId: {
        type: ObjectId,
        required: false,
        ref: "Company"
    },
    userId: {
        type: ObjectId,
        required: false,
        ref: "User"
    }
}, { timestamps: true });
      TodoSchema.index(
      {name:"text",}
    )
      