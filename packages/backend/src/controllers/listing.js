import db from "../models/index.js";

const Listing = db.Listing;

// Get all listings
export const findAll = async (req, res) => {
  try {
    const condition = {
      ...("name" in req.query
        ? { name: { $regex: new RegExp(req.query.name), $options: "i" } }
        : {}),
    };

    const listings = await Listing.find(condition).populate("category");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single listing by ID
export const findOne = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("category");
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new listing
export const create = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a listing by ID
export const update = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category");
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a listing by ID
export const remove = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
