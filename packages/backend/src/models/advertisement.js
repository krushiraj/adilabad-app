import { Schema, model } from "mongoose";

import timestamps from "./options/timestamp.js";

const AdvertisementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      enum: ["image", "video", "text"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
  },
  {
    timestamps,
  }
);

const Advertisement = model("Advertisement", AdvertisementSchema);

export default Advertisement;
