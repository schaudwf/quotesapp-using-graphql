import mongoose  from "mongoose";

const quotesSchema = new mongoose.Schema({
  name:{
    type:String,
    required : true,
  },

  by:{
    type:mongoose.Schema.Types.ObjectId,

    ref : "user"
  },
 

})

mongoose.model("QUOTE", quotesSchema)