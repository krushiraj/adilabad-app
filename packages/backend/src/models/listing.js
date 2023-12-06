import { Schema, model } from "mongoose";

import timestamp from "./options/timestamp.js";

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
    // Additional fields like address, contact information, etc.
    // These fields will depend on the specific requirements of your application.
  },
  {
    ...timestamp,
  }
);

const Listing = model("Listing", ListingSchema);

export default Listing;
