import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/sign.controller.js";
import { userSignInValidation, userSignUpValidation } from "../middlewares/sign.middlewares.js";

const router = Router();

router.post("/signup", userSignUpValidation, postSignUp);
router.post("/signin", userSignInValidation, postSignIn);

export default router;