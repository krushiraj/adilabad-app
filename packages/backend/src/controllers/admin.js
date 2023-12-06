import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

import config from "../config/index.js";

const Admin = db.Admin;

// create a new admin via signup
export const signUp = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const savedAdmin = await admin.save();

    const token = jwt.sign(
      {
        _id: savedAdmin._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      ...savedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get admin for signin
export const signIn = async (req, res) => {
  try {
    const admin = await Admin.findOne(req.body);
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      ...admin,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// update admin
export const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: false,
      }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// change admin password
export const changePassword = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(req.body.oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword,
      },
      {
        new: false,
      }
    );

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }
    res.json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
