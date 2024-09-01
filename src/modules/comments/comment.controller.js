import { where } from "sequelize"
import postModel from "../../../db/models/post.model.js"
import userModel from "../../../db/models/user.model.js"
import commentModel from "../../../db/models/comment.model.js"



//create comments
export const createComment = async (req, res, next) => {
    const { content } = req.body
    const { userId, postId } = req.params

    const user = await userModel.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const post = await postModel.findByPk(postId);
    if (!post) {
        return res.status(404).json({ message: "post not found" });
    }

    const newComment = await commentModel.create({ content, userId, postId })
    return res.status(201).json({ message: 'comment created successfully', comment: newComment })
}


//READ COMMENTS
// read all comments for each post 
export const getComments = async (req, res, next) => {
    const comments = await commentModel.findAll()
    if(!comments[0]){
        return res.status(400).json({message: "comments not found"})
    }
    res.status(200).json({ msg: "done", comments })
}


//read all comments for a specific post
export const getPostComments = async (req, res, next) => {
    const { postId } = req.params
    const comments = await commentModel.findAll({
        where: { postId }
    });
    if(!comments[0]){
        return res.status(400).json({message: "post not found"})
    }
    res.status(200).json(comments);
}

//read all comments from a specific user
export const getUserComments = async (req, res, next) => {
    const { userId } = req.params
    const comments = await commentModel.findAll({
        where: { userId }
    });
    if(!comments[0]){
        return res.status(400).json({message: "user not found"})
    }
    res.status(200).json(comments);
}

//read all comments for a specific post from a specific user
export const getUserPostComments = async (req,res,next)=>{
    const {userId, postId}= req.params
    const comments = await commentModel.findAll({
        where: { userId, postId}
    });
    if(!comments[0]){
        return res.status(400).json({message: "user or post not found"})
    }
    res.status(200).json(comments);
}



//update comment
export const updateComment = async (req,res,next)=>{
    const {content} = req.body
    const {userId, commentId} = req.params
    const comment= await commentModel.update({content},{ where: { id:commentId , userId } });
    if (!comment[0]) {
        return res.status(404).json({ message: "comment not found or not authorized" });
    }
    const updatedComment = await commentModel.findByPk(commentId, {
        include: userModel, postModel
    });

    res.status(200).json(updatedComment);

}

//delete comment

export const deleteComment = async(req,res,next)=>{
    const {userId, commentId} =req.params
    const comment = await commentModel.destroy({
        where: { id:commentId ,userId}
    })
    
    if(!comment){
        return res.status(404).json({message: "comment not found or not authorized"})
    }
    const allComments = await commentModel.findAll({ where: {userId}})
    res.status(200).json(allComments)
}
