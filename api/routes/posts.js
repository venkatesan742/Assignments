import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/posts.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createPost);

//UPDATE
router.put("/:id", verifyUser, updatePost);

//DELETE
router.delete("/:id", verifyUser, deletePost);

//GET
router.get('/:id', verifyUser, getPost);

//GET ALL
router.get("/", verifyAdmin, getPosts);

export default router