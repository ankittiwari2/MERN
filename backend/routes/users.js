var express = require('express');
var router = express.Router();
var userControllers = require("../controllers/userControllers")
var auth = require("../middleware/Auth");
const DIR = './public/';
let path = require('path')
var multer = require("multer")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//bulk Upload
var Upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});


/* GET users listing. */
router.post('/signup',userControllers.signup) 

router.post('/login',userControllers.login);


router.post('/addTask',userControllers.addTask);


router.get('/taskList',userControllers.taskList);




module.exports = router;
