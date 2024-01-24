import db from "../models/index.js";

const Advertisement = db.Advertisement;

// Get all advertisements
export const findAll = async (req, res) => {
  try {
    const condition = req.query.q ? {
      $or: [
        { name: { $regex: new RegExp(req.query.q, 'i') } },
        { description: { $regex: new RegExp(req.query.q, 'i') } },
        { alt: { $regex: new RegExp(req.query.q, 'i') } },
        { content: { $regex: new RegExp(req.query.q, 'i') } }
      ]
    } : {};

    const advertisements = await Advertisement.find(condition);
    res.json(advertisements);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single advertisements by ID
export const findOne = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.id);
    if (!advertisements) {
      return res.status(404).json({ error: "Advertisements not found" });
    }
    res.json(advertisements);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new advertisements
export const create = async (req, res) => {
  try {
    const advertisements = new Advertisement(req.body);
    await advertisements.save();
    res.status(201).json(advertisements);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a advertisements by ID
export const update = async (req, res) => {
  try {
    const advertisements = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!advertisements) {
      return res.status(404).json({ error: "Advertisements not found" });
    }
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a advertisements by ID
export const remove = async (req, res) => {
  try {
    const advertisements = await Advertisement.findByIdAndDelete(req.params.id);
    if (!advertisements) {
      return res.status(404).json({ error: "Advertisements not found" });
    }
    res.json({ message: "Advertisements deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
