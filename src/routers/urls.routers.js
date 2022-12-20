import { Router } from "express";
import { postUrls, getUrlsById, openUrl, deleteUrl, getRanking } from "../controllers/urls.controller.js";
import { urlsValidation, loginAuthorization, shortUrlExistenceById, shortUrlExistence, shortUrlOwnerValidation } from "../middlewares/urls.middlewares.js";

const router = Router();

router.post("/urls/shorten", loginAuthorization, urlsValidation, postUrls);
router.get("/urls/:id", shortUrlExistenceById, getUrlsById);
router.get("/urls/open/:shortUrl", shortUrlExistence, openUrl);
router.delete("/urls/:id", loginAuthorization, shortUrlExistenceById, shortUrlOwnerValidation, deleteUrl);
router.get("/ranking", getRanking);

export default router;