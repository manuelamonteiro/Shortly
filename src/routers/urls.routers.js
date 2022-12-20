import { Router } from "express";
import { postUrls, getUrlsById, openUrl, deleteUrl, getRanking } from "../controllers/urls.controller.js";
import { urlsValidation, loginAuthorization, shortUrlExistanceById, shortUrlExistance, shortUrlOwnerValidation } from "../middlewares/urls.middlewares.js";

const router = Router();

router.post("/urls/shorten", loginAuthorization, urlsValidation, postUrls);
router.get("/urls/:id", shortUrlExistanceById, getUrlsById);
router.get("/urls/open/:shortUrl", shortUrlExistance, openUrl);
router.delete("/urls/:id", loginAuthorization, shortUrlExistanceById, shortUrlOwnerValidation, deleteUrl);
router.get("/ranking", getRanking);

export default router;