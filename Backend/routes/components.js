const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Item = require("../models/Item");
const useditem = require("../models/useditem");

// Router for admin for add components and information
router.post("/item", fetchuser, async (req, res) => {
  try {
    // checking role is admin or not for access to add item
    userrole = req.user.role;
    if (userrole !== "admin") {
      return res.status(401).json({error: "Your can't access this"});
    }
    // admin adding item to database
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Router for admin for fetching components information
router.get("/getitems", fetchuser, async (req, res) => {
  try {
    // checking role is admin or not for access to add item
    userrole = req.user.role;
    if (userrole !== "admin") {
      return res.status(401).json({error: "Your can't access this"});
    }
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/used-items", fetchuser, async (req, res) => {
  try {
    const data = await Item.find();
    const uniqueNames = Array.from(new Set(data.map((item) => item.name)));
    if (uniqueNames.includes(req.body.name)) {
      const UsedItem = new useditem({
        userID: req.user.id,
        userName: req.user.username,
        name: req.body.name,
        purpose: req.body.purpose,
        usedQuantity: req.body.usedQuantity,
        useDate: req.body.useDate,
      });
      const savedUsedItem = await UsedItem.save();
      return res.json(savedUsedItem);
    } else {
      return res.status(500).json({ error: "item name is not define" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// fetching used item for user and admin
router.get("/getuseditem", fetchuser, async (req, res) => {
  try {
    // checking role is admin or not for access to add item
    userrole = req.user.role;
    if (userrole !== "admin") {
      const items = await useditem.find({ userID: req.user.id });
      return res.json(items);
    } else {
      const items = await useditem.find();
      return res.json(items);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// total used and present components routing
router.get("/totalquantity", async (req, res) => {
  try {
    // Fetch items from the database and sort by availableQuantity in descending order
    const items = await Item.find().sort({ quantity: -1 });

    // Create a map to store total available quantity for each item
    const totalQuantityMap = new Map();

    // Calculate total available quantity for each item
    items.forEach((item) => {
      // Convert quantity from string to integer
      const quantity = parseInt(item.quantity, 10);

      if (totalQuantityMap.has(item.name)) {
        totalQuantityMap.set(item.name, totalQuantityMap.get(item.name) + quantity);
      } else {
        totalQuantityMap.set(item.name, quantity);
      }
    });

    // Prepare the result in the desired format
    const result = [];
    totalQuantityMap.forEach((totalQuantity, name) => {
      result.push({ name, totalQuantity });
    });

    // Respond with the sorted and aggregated result
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalusedquantity", async (req, res) => {
  try {
    // Fetch used items from the database and sort them by name and used quantity
    const usedItems = await useditem.find().sort({ usedQuantity: -1 });

    // Create a map to store total used quantity for each item
    const totalQuantityMap = new Map();

    // Calculate total used quantity for each item
    usedItems.forEach((item) => {
      const usedQuantityInt = parseInt(item.usedQuantity, 10); // Convert string to integer

      if (totalQuantityMap.has(item.name)) {
        totalQuantityMap.set(item.name, totalQuantityMap.get(item.name) + usedQuantityInt);
      } else {
        totalQuantityMap.set(item.name, usedQuantityInt);
      }
    });

    // Prepare the result in the desired format
    const result = [];
    totalQuantityMap.forEach((totalQuantity, name) => {
      result.push({ name, totalQuantity });
    });

    // Respond with the sorted and aggregated result
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// item location finding routing
router.get("/locationdata", async (req, res) => {
  try {
    // Fetch items from the database
    const items = await Item.find();

    // Create an object to store the name-location pairs
    const locationMap = {};

    // Iterate through items to extract name-location pairs
    items.forEach((item) => {
      // Store the name-location pair in the object
      locationMap[item.name] = item.location;
    });

    // Respond with the name-location pairs
    res.json(locationMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
