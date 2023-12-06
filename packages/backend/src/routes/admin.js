import { Router } from "express";

import {
  signUp,
  signIn,
  changePassword,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.js";
import rateLimiter from "../middlewares/ratelimiting.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

const twoSecondRateLimiter = rateLimiter(2000, 1);

router.post("/signup", twoSecondRateLimiter, signUp);
router.post("/signin", twoSecondRateLimiter, signIn);
router.put("/change-password/:id", twoSecondRateLimiter, verifyToken, changePassword);
router.put("/update/:id", twoSecondRateLimiter, verifyToken, updateAdmin);
router.delete("/delete/:id", twoSecondRateLimiter, verifyToken, deleteAdmin);

export default router;
