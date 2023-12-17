import { Schema, model } from "mongoose";

import timestamps from "./options/timestamp.js";

const MediaSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
});

const ListingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phoneNumbers: [{
      type: String,
      default: null,
    }],
    links: {
      email: {
        type: String,
        default: null,
      },
      website: {
        type: String,
        default: null,
      },
      whatsapp: {
        type: String,
        default: null,
      },
      facebook: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
      instagram: {
        type: String,
        default: null,
      },
      youtube: {
        type: String,
        default: null,
      },
    },
    address: {
      type: String,
      required: true,
    },
    media: {
      type: [MediaSchema],
      default: [],
    },
  },
  {
    timestamps,
  }
);

const Listing = model("Listing", ListingSchema);

export default Listing;
