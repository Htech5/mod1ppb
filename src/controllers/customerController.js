import { CustomerModel } from "../models/customerModel.js";

// null jika valid, pesan error jika tidak
export function validate({ email, phone } = {}) {
  if (!email || !String(email).includes("@")) return "Email harus mengandung karakter @";
  if (!phone || String(phone).length < 10) return "Nomor telepon minimal 10 karakter";
  return null;
}

export const CustomerController = {
  async getAll(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
      const customers = await CustomerModel.getAll({
        name: req.query.name,
        page,
        limit,
      });
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const invalid = validate(req.body);
      if (invalid) return res.status(400).json({ error: invalid });
      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const invalid = validate(req.body);
      if (invalid) return res.status(400).json({ error: invalid });
      const customer = await CustomerModel.update(req.params.id, req.body);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
