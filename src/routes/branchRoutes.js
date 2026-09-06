import express from "express";
import { BranchController } from "../controllers/branchController.js";

const router = express.Router();

router.get("/", BranchController.getAll);
router.get("/:id", BranchController.getById);
router.post("/", BranchController.create);
router.put("/:id", BranchController.update);
router.delete("/:id", BranchController.remove);

export default router;
