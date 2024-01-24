import { Router } from "express";

import {
  create,
  remove,
  update,
  findAll,
  findOne,
} from "../controllers/advertisement.js";
import { isAdmin, verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", verifyToken, isAdmin, create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", verifyToken, isAdmin, update);
router.delete("/:id", verifyToken, isAdmin, remove);

export default router;
