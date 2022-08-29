const jwt = require("jsonwebtoken");
const { Crud } = require("../models/crud");

const auth = async (req, res, next) => {
  try {
    const header = req.headers;
    let user = jwt.verify(
      header.authorization.replace("Bearer ", ""),
      "mySecureKey"
    );
    const userData = await Crud.find({ _id: user._id });

    if (userData[0].isAdmin) {
      next();
    } else {
      return res.status(401).send("Permission denied !!!!");
    }
  } catch (error) {
    return res.status(401).send("Permission denied!");
  }
};

module.exports = auth;

// if(header.authorization){}
