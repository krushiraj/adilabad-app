import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

import config from "../config/index.js";

const User = db.User;

// create a new user via signup
export const signUp = async (req, res) => {
  try {
    const { JWT_SECRET } = config;
    const user = new User(req.body);
    const savedUser = await user.save();

    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, ...savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user for signin
export const signIn = async (req, res) => {
  try {
    const { JWT_SECRET } = config;
    const user = await User.findOne(req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    req.session.user = user;

    res.json({ token, ...user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// check if user already exists
export const checkUser = async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
