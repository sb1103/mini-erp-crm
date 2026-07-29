import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// All customer routes require login
router.post("/", authenticate, createCustomer);
router.get("/", authenticate, getCustomers);
router.get("/:id", authenticate, getCustomerById);
router.put("/:id", authenticate, updateCustomer);
router.delete("/:id", authenticate, deleteCustomer);

export default router;