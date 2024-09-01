import { Router } from "express";
import * as PC from "./post.controller.js";

const router = Router() 

//create posts
router.post("/posts/:author", PC.createPost)

//read posts
router.get("/posts", PC.getAllPosts)
router.get("/posts/:author", PC.getPosts)

//update post
router.put("/:author/:postId", PC.updatePost)

//soft delete post
router.put("/updatePost/:author/:postId", PC.deletePost)
export default router