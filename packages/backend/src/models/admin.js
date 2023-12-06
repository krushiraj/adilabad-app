import { Schema, model } from "mongoose";

import timestamp from "./options/timestamp.js";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true, // This is a required field
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    ...timestamp,
  }
);

const Admin = model("Admin", AdminSchema);

export default Admin;
