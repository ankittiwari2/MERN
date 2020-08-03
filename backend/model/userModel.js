const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },

    email: {
      type: String
    },
    password: {
      type: String
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema, "users");