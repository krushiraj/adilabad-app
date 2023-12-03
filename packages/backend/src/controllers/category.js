import db from "../models";

const Category = db.Category;

// Create and Save a new Category
export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Category
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    });

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
    const name = req.query.name;
    var condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};

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

    const data = await Category.findById(id);
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

    const data = await Category.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
      });
    } else res.send({ message: "Category was updated successfully." });
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
