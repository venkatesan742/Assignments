import express from "express";
import { updateUser, deleteUser, getUsers, getUser } from "../controllers/users.js";

const router = express.Router();

//UPDATE
router.put("/:id",  updateUser)

//DELETE
router.delete("/:id",  deleteUser)

//GET
router.get("/:id",  getUser)


//GET ALL
router.get("/",  getUsers)

export default router