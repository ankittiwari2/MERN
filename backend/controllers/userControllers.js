var UserModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const AuthServices = require("../services/authServices")
const addTask = require("../model/taskModel")
const orderModel = require("../model/orderModel")

const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}))


exports.signup = async (req, res, next) => {
  try {

    let value = req.body
    let email = req.body.email.toLowerCase()
    value.email = email

    let isUserExists = await UserModel.findOne({ 'email': value.email, 'role': value.role });
    if (isUserExists) {
      return res.status(400).send({ "message": 'User Exists', status: 400 })
    }


    value.password = bcrypt.hashSync(value.password, 12)
    let user = await UserModel.create(value);


    return res.status(200).json({ success: "User created", status: 200 })


  } catch (error) {
    next(error);
  }
}



exports.login = async (req, res, next) => {
  try {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;

    let UserData = await UserModel
      .findOne({ email: email })


    if (!UserData) {
      return res
        .status(400)
        .json({ message: "User does not exists", status: 400 });
    }



    let isMatch = bcrypt.compareSync(password, UserData.password)

    if (isMatch) {
      let token = AuthServices.newToken({
        email: UserData.email,
        userId: UserData._id,
        role: UserData.role
      });

      let data = {
        token,
        UserData
      };
      return res
        .status(200)
        .json({ message: "Login sucessfully", data: data, status: 200 });
    } else {
      return res.status(200).json({ message: "Wrong password", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.status(501).error("Internal server error");
  }
};


exports.addTask = async (req, res, next) => {
  try {
    console.log(req.body)

    let data = await addTask.create(req.body)

    return res
      .status(200)
      .json({ message: "food addedd", data: data, status: 200 });

  } catch (error) {
    console.log(error);
    res.status(501).error("Internal server error");
  }
};

exports.taskList = async (req, res, next) => {
  try {


    let query = {};


    let data = await addTask.find(query);
    console.log(data)
    return res
      .status(200)
      .json({ message: "food List", data: data, status: 200 });

  } catch (error) {
    console.log(error);
    res.status(501).error("Internal server error");
  }
};

