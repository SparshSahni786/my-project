const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Seed database with sample products
router.post("/seed", async (req, res) => {
  try {
    // clear collection
    await Product.deleteMany();

    // data to insert
    const sampleProducts = [
      {
        name: "T-Shirt",
        price: 499,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 20 },
          { color: "Blue", size: "L", stock: 15 },
        ],
      },
      {
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        variants: [
          { color: "Silver", size: "15-inch", stock: 10 },
          { color: "Gray", size: "13-inch", stock: 5 },
        ],
      },
      {
        name: "Sneakers",
        price: 2999,
        category: "Footwear",
        variants: [
          { color: "White", size: "9", stock: 12 },
          { color: "Black", size: "10", stock: 7 },
        ],
      },
    ];

    const inserted = await Product.insertMany(sampleProducts);
    res.status(201).json({
      message: "Sample products seeded successfully!",
      total: inserted.length,
      data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed products", details: err.message });
  }
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products", details: err.message });
  }
});

// Filter products by category (supports query param or URL param)
router.get("/category/:cat", async (req, res) => {
  try {
    const category = req.params.cat;
    const items = await Product.find({ category });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Error filtering by category", details: err.message });
  }
});

// Fetch products by variant color
router.get("/variant/:clr", async (req, res) => {
  try {
    const color = req.params.clr;
    const items = await Product.find(
      { "variants.color": color },
      { name: 1, category: 1, "variants.$": 1 }
    );
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Error fetching variant data", details: err.message });
  }
});

module.exports = router;
