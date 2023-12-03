import { Schema, model } from "mongoose";

import timestamp from "./options/timestamp";

const UserSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: true, // This is a required field
  },
}, {
  ...timestamp,
});

const User = model("User", UserSchema);

export default User;
