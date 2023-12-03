import { Schema, model } from "mongoose";

import timestamp from "./options/timestamp";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Null for main categories
    },
    // Add other fields as needed, e.g., description, image URL, etc.
  },
  {
    ...timestamp,
  }
);

const Category = model("Category", CategorySchema);

export default Category;
