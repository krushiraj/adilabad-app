import db from "../models/index.js";

const Category = db.Category;
const Listing = db.Listing;

// Create and Save a new Category
export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Category name can not be empty!" });
      return;
    }

    // Create a Category
    const category = new Category(req.body);

    // Save Category in the database
    const data = await category.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Category.",
    });
  }
};

// Retrieve all Categories from the database.
export const findAll = async (req, res) => {
  try {
    const condition = {
      ...("name" in req.query
        ? { name: { $regex: new RegExp(req.query.name), $options: "i" } }
        : {}),
      ...("parentCategory" in req.query
        ? { parentCategory: req.query.parentCategory || null }
        : {}),
    };

    const data = await Category.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving categories.",
    });
  }
};

// Find a single Category with an id
export const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Category.findById(id).populate("parentCategory");
    if (!data)
      res.status(404).send({ message: "Not found Category with id " + id });
    else res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving Category with id=" + id });
  }
};

// Update a Category by the id in the request
export const update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true, // Return the updated document
    });

    if (!updatedCategory) {
      res.status(404).send({
        message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
      });
    } else {
      res.send(updatedCategory);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Category with id=" + id,
    });
  }
};

// Delete a Category with the specified id in the request
export const remove = async (req, res) => {
  try {
    const id = req.params.id;

    // delete all categories that have this category as parent
    const childrenData = await Category.deleteMany({ parentCategory: id });
    req.logger.info(`Deleted ${childrenData.deletedCount} children categories.`);

    // set category to null for all listings
    const listingData = await Listing.updateMany(
      { category: id },
      { category: null }
    );
    req.logger.info(`Updated ${listingData.nModified} listings.`);

    const data = await Category.findByIdAndRemove(id);
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
      });
    } else {
      res.send({
        message: "Category was deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Category with id=" + id,
    });
  }
};
