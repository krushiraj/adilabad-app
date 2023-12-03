import db from "../models/index.js";

const Listing = db.Listing;

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a listing by ID
export const updateListing = async (req, res) => {
  try {
    const listing = await findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a listing by ID
export const deleteListing = async (req, res) => {
  try {
    const listing = await findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
