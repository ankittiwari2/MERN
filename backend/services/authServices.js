const jwt = require("jsonwebtoken");



class AuthController {
    

  newToken(id, role, email){
    return jwt.sign(
      {
        id: id,
        role: role,
        email: email
      },
      "test"
    );
  };

}

module.exports=new AuthController()