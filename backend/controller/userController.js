const asyncHandler = require("../middleware/asyncHandler.js");
const User = require("../models/userModel.js");
const generateTokens = require("../utils/generateTokens.js");
// @desc Auth user and get the tokens
// @route POST /api/users/login
// @acess Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateTokens(res, user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("email or password is invalid");
  }
  res.send("auth user");
});
// @desc Register the user
// @route POST /api/users/
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    generateTokens(res, newUser._id);
    res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

  // res.send("register user");
});
// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @acess Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200);
  res.json({ message: "Successfully Logged out!" });
});
// @desc Get user profile
// @route GET /api/users/profile
// @acess Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userObj = await User.findById(req.user._id);
  // console.log(userObj);
  if (userObj) {
    res.json({
      _id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      isAdmin: userObj.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Error! User not found");
  }
});

// @desc Update user profile
// @route POST /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userObj = await User.findById(req.user._id);

  if (userObj) {
    userObj.name = req.body.name || userObj.name;
    userObj.email = req.body.email || userObj.email;
    if (req.body.password) {
      userObj.password = req.body.password;
    }
    const updatedUser = await userObj.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Error! User not found");
  }
});

// @desc Get users
// @route POST /api/users/
// @acess Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
// @desc Get user by id
// @route POST /api/users/:id
// @acess Private/admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc Delete users
// @route DELETE /api/users/:id
// @acess Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});
// @desc Update users
// @route POST /api/users/:id
// @acess Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
