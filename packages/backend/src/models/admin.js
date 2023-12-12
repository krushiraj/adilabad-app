import { Schema, model } from "mongoose";

import timestamps from "./options/timestamp.js";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      default: "Adilbad Admin",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps,
  }
);

const Admin = model("Admin", AdminSchema);

export default Admin;
