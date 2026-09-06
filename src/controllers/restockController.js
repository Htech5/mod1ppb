import { RestockModel } from "../models/restockModel.js";

export const RestockController = {
  async getAll(req, res) {
    try {
      const restocks = await RestockModel.getAll();
      res.json(restocks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { product_id, supplier_name, quantity } = req.body;
      if (!product_id || !supplier_name || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          error: "product_id, supplier_name, dan quantity (integer > 0) wajib diisi",
        });
      }
      const restock = await RestockModel.create({ product_id, supplier_name, quantity });
      res.status(201).json(restock);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
