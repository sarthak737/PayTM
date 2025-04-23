const express = require("express");
const { authCheck } = require("../middlewares/auth.middlewares");
const { Account, User } = require("../models/user.models");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authCheck, async (req, res) => {
  try {
    const user = req.user;
    const userAccount = await Account.findOne({ userId: user._id });
    return res.status(201).json({ balance: userAccount.balance });
  } catch (error) {
    return res.status(403).json({
      message: "Error getting balance",
      err: error.message,
    });
  }
});

accountRouter.post("/transfer", authCheck, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;
    if (amount < 1) {
      await session.abortTransaction();
      throw new Error("Wrong amount");
    }
    const currentUser = req.user;
    const userToSend = await User.findOne({ username: to }).session(session);
    if (!userToSend) {
      await session.abortTransaction();
      throw new Error("User not found");
    }
    const currUser = await Account.findOne({ userId: currentUser._id });
    if (currUser.balance - amount < 0) {
      await session.abortTransaction();
      throw new Error("Insufficient balance");
    }
    const receiverAccount = await Account.findOneAndUpdate(
      {
        userId: userToSend._id,
      },
      { $inc: { balance: amount } }
    ).session(session);
    const currentUSerAcc = await Account.findOneAndUpdate(
      {
        userId: currentUser._id,
      },
      { $inc: { balance: -amount } }
    ).session(session);
    // currentUSerAcc.balance -= amount;
    // receiverAccount.balance += amount;

    // await receiverAccount.save();
    // await currentUSerAcc.save();
    await session.commitTransaction();
    return res
      .status(201)
      .json({ message: "Funds transfered", balance: currentUSerAcc.balance });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Error transfer", err: error.message });
  }
});

module.exports = { accountRouter };
