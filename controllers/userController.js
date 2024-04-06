const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fiels are mandatory');
  }
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password: ', hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
    return;
  }
  res.status(400);
  throw new Error('User data is not valid');
});

//@desc Login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    );
    res.status(200).json({ accessToken });
    return;
  }
  res.status(401);
  throw new Error('Email or password is not valid');
});

//@desc Get current user
//@route GET /api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current user' });
});

module.exports = { registerUser, loginUser, currentUser };
