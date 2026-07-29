import { Router } from "express";
import {
  createChallan,
  getChallans,
  getChallanById,
  deleteChallan,
} from "../controllers/challan.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, createChallan);
router.get("/", authenticate, getChallans);
router.get("/:id", authenticate, getChallanById);
router.delete("/:id", authenticate, deleteChallan);

export default router;