import express from "express";
import { updateUser, deleteUser, getUsers, getUser } from "../controllers/users.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser,  getUser)

//GET ALL
router.get("/", verifyAdmin, getUsers)


export default router