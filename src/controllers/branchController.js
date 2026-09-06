import { BranchModel } from "../models/branchModel.js";

export const BranchController = {
  async getAll(req, res) {
    try {
      const branches = await BranchModel.getAll();
      res.json(branches);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const branch = await BranchModel.getById(req.params.id);
      res.json(branch);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const branch = await BranchModel.create(req.body);
      res.status(201).json(branch);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const branch = await BranchModel.update(req.params.id, req.body);
      res.json(branch);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await BranchModel.remove(req.params.id);
      res.json({ message: "Branch deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
