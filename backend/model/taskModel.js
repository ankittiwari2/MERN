const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const taskSchema = new Schema(
  {
 
    role:{
        type:String
    },
    userName:{
      type:String
    },
    taskName:{
      type:String
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema, "task");