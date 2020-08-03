const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const orderSchema = new Schema(
  {
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods"
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    quantity:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema, "order");