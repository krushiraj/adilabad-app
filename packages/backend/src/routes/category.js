import { Router } from "express";

import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../controllers/category.js";
import { isAdmin, verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", verifyToken, isAdmin, create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", verifyToken, isAdmin, update);
router.delete("/:id", verifyToken, isAdmin, remove);

export default router;
