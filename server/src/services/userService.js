const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/User");

const JWT_SECRET = 'dfsfsfsfkkl564dsf6ds3kdfhfihdf';

async function register(email, password) {
  // check if email is taken
  const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (existing) {
    throw new Error("Email is taken");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // store user
  const user = new User({
    email,
    hashedPassword,
  });
  await user.save();
  return createSession(user);
}

async function login(email, password) {
  // check if user exists
  const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (!user) {
    throw new Error("Incorrect email or password");
  }
  // verify password
  const match = await bcrypt.compare(password, user.hashedPassword);
  if(!match) {
    throw new Error("Incorrect email or password");
  }

  return createSession(user);

}

function createSession(user) {
  // create and sign payload
  const payload = {
    email: user.email,
    _id: user._id
  }
  // return token and user
  const accessToken = jwt.sign(payload, JWT_SECRET)

  return {
    email: user.email,
    accessToken,
    _id: user._id
  };
}

module.exports = {
    register,
    login
}
