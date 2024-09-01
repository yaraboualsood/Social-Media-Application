import { where } from "sequelize"
import postModel from "../../../db/models/post.model.js"
import userModel from "../../../db/models/user.model.js"



//create posts
export const createPost = async (req,res,next)=>{
    const {title, content} = req.body
    const {author} = req.params

    const user = await userModel.findByPk(author);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const newPost = await postModel.create({title, content, author})

    return res.status(201).json({ message: 'Post created successfully', post: newPost})
}



// read all posts
export const getAllPosts = async (req,res,next) =>{
    const users = await postModel.findAll() 
    res.status(200).json({ msg: "done", users })

}

 //reading all posts for a specific user
export const getPosts = async (req, res, next) => {
   
    const {author} = req.params
    const posts = await postModel.findAll({ 
        where: { author}
    });
    
    if(!posts[0]){
        return res.status(400).json({message: "post not found"})
    }

    res.status(200).json(posts);
}



//update post
export const updatePost = async (req,res,next)=>{
    const {title, content} = req.body
    const {author, postId} = req.params
    const post= await postModel.update({title, content},{ where: { id:postId , author } });
    if (!post[0]) {
        return res.status(404).json({ message: "Post not found or not authorized" });
    }
    const updatedPost = await postModel.findByPk(postId, {
        include: userModel
    });

    res.status(200).json(updatedPost);

}

//delete post (soft delete)

export const deletePost = async(req,res,next)=>{
    const {author, postId} =req.params
    const {isDeleted} = req.body
    const post = await postModel.update({isDeleted},{
        where: { id:postId ,author}
    })
    if(!post[0]){
        return res.status(404).json({message: "Post not found or not authorized"})
    }
    const allPosts = await postModel.findAll({ where: { author}})
    res.status(200).json(allPosts )   
}


