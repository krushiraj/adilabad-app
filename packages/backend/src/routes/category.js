import { Router } from "express";

import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../controllers/category.js";

const router = Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
