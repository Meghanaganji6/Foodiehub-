const express = require("express");
const router = express.Router();
const {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menuController");

// Public
router.get("/", getAllMenuItems);

// Protected (later add middleware for admin/staff)
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;
