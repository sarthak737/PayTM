const express = require("express");
const userRouter = express.Router();
const z = require("zod");
const { User, Account } = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config.js");
const bcrypt = require("bcrypt");
const { authCheck } = require("../middlewares/auth.middlewares.js");

const usernameSchema = z.string().min(4).max(8);
const firstNameSchema = z.string().min(3).max(20);
const passwordSchema = z.string().min(6).max(10);

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, firstName, password } = req.body;
    const validUsername = usernameSchema.parse(username);
    const validFirstName = firstNameSchema.parse(firstName);
    const validPassword = passwordSchema.parse(password);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, username, password: hashPassword });
    const createdUSer = await newUser.save();
    const balance = Math.floor(Math.random() * 10000) + 1;
    const userAccount = new Account({ userId: createdUSer._id, balance });
    await userAccount.save();
    console.log(createdUSer);
    if (!createdUSer) {
      throw new Error("Error creating user");
    }
    const id = createdUSer._id;
    const token = jwt.sign({ id }, JWT_SECRET);
    console.log();
    return res
      .status(201)
      .cookie("token", token)
      .json({ message: "User created", token });
  } catch (error) {
    return res.status(403).json({ message: "Error", error });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    usernameSchema.parse(username);
    passwordSchema.parse(password);
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new Error("User not present");
    }
    const isPasswordCOrrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCOrrect) {
      throw new Error("Incorrect password");
    }

    const id = existingUser._id;
    const token = jwt.sign({ id }, JWT_SECRET);

    return res
      .status(201)
      .cookie("token", token)
      .json({ message: "Logged In", token });
  } catch (error) {
    return res.status(403).json({ message: "Login Error", error });
  }
});

userRouter.patch("/update", authCheck, async (req, res) => {
  try {
    const { username, firstName, password } = req.body;
    const existingUser = req.user;
    if ("username" in req.body) {
      usernameSchema.parse(username);
      if (username == existingUser.username) throw new Error("Already same");
      existingUser.username = username;
    }
    if ("firstName" in req.body) {
      firstNameSchema.parse(firstName);
      if (firstName == existingUser.firstName) throw new Error("Already same");
      existingUser.firstName = firstName;
    }
    if ("password" in req.body) {
      passwordSchema.parse(password);
      const isPassSame = await bcrypt.compare(password, existingUser.password);
      if (isPassSame) throw new Error("Already same");
      const newPass = await bcrypt.hash(password, 10);
      existingUser.password = newPass;
    }
    await existingUser.save();
    return res.status(201).json({ message: "User updated" });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Error update", err: error.message });
  }
});

userRouter.get("/bulk", authCheck, async (req, res) => {
  try {
    const { f } = req.query;

    const foundUser = await User.findOne({
      $or: [
        {
          firstName: f,
        },
        {
          username: f,
        },
      ],
    }).select("firstName username");

    return res.status(201).json({
      users: foundUser,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Error finding user", err: error.message });
  }
});

userRouter.get("/info", authCheck, async (req, res) => {
  const user = req.user;
  res.status(201).json({ user });
});

userRouter.get("/users", authCheck, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.status(201).json({ users });
});

module.exports = {
  userRouter,
};
