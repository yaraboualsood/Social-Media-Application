import { Router } from "express";
import * as CC from "./comment.controller.js";

const router = Router() 

//create comments
router.post("/:userId/:postId/comments", CC.createComment)

//read comments
   //all comments
router.get("/comments", CC.getComments)
   //all comments on a specific post
router.get("/:postId/comments", CC.getPostComments)
   //all comments from a specific user
router.get("/comments/:userId", CC.getUserComments)
//read all comments for a specific post from a specific user
router.get("/:userId/:postId/comments", CC.getUserPostComments)


//update comment
router.put("/comments/:userId/:commentId", CC.updateComment)

//delete comment
router.delete("/comments/:userId/:commentId", CC.deleteComment)
export default router