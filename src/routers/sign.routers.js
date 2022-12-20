import { Router } from "express";
import { postSignIn, postSignUp, getUserUrls } from "../controllers/sign.controller.js";
import { userSignInValidation, userSignUpValidation, userExistence } from "../middlewares/sign.middlewares.js";
import { loginAuthorization } from "../middlewares/urls.middlewares.js";

const router = Router();

router.post("/signup", userSignUpValidation, postSignUp);
router.post("/signin", userSignInValidation, postSignIn);
router.get("/users/me", loginAuthorization, userExistence, getUserUrls);

export default router;