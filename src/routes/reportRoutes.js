import express from "express";
import { CustomerModel } from "../models/customerModel.js";

const router = express.Router();

router.get("/total", async (req, res) => {
  try {
    res.json({ total: await CustomerModel.count() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
