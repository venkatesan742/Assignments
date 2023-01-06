import express from "express";
import { getInfos } from "../controllers/info.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//GET ALL INFOS
router.get("/", verifyUser, getInfos);

export default router