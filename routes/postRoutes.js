import {Router} from "express";
import {createPost , updatePost, fetchPosts, showPost, deletePost, searchPosts} from "../Controller/PostController.js";



const router = Router();

router.get("/", fetchPosts);
router.get("/search", searchPosts);
router.get("/:id", showPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;