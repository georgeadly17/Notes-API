const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "please provide a email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a passwrod"],
      minlength: 6,
    },
  },
  { timestaps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return token;
};

UserSchema.methods.checkPassword = async function (loginPassword) {
  const isMatch = await bcrypt.compare(loginPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
