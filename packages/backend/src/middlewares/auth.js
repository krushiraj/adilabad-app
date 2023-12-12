import admin from "firebase-admin";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

import config from "../config/index.js";
import firebaseAdminConfig from "../../adb-app-krushi-firebase-adminsdk.json" assert { type: "json" };

export const checkFirebaseUserId = async (req, res, next) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
  }

  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const firebaseUser = await admin.auth().getUser(req.body.uid);

    // redundant but safe check
    if (!firebaseUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    if (req.session.user._id !== decoded._id) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const admin = await db.Admin.findById(req.session.user._id);
    if (!admin) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
