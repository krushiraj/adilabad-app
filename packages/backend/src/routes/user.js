import { Router } from "express";

import {
  signUp,
  signIn,
  checkUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import rateLimiter from "../middlewares/ratelimiting.js";
import { checkFirebaseUserId } from "../middlewares/auth.js";

const router = Router();

const twoSecondRateLimiter = rateLimiter(2000, 1);

router.post("/signup", twoSecondRateLimiter, checkFirebaseUserId, signUp);
router.post("/signin", twoSecondRateLimiter, signIn);
router.get("/check", checkUser);
router.put("/update/:id", twoSecondRateLimiter, updateUser);
router.delete("/delete/:id", twoSecondRateLimiter, deleteUser);

export default router;
