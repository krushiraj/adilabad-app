import { Schema, model } from "mongoose";

import timestamps from "./options/timestamp.js";

const UserSchema = new Schema({
  name: {
    type: String,
    default: "Adilabadi",
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps,
});

const User = model("User", UserSchema);

export default User;
