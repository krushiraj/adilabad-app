import { Schema, model } from "mongoose";

import timestamps from "./options/timestamp.js";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/50",
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Null for main categories
    },
    published: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    // Add other fields as needed, e.g., description, image URL, etc.
  },
  {
    timestamps,
  }
);

const Category = model("Category", CategorySchema);

export default Category;
