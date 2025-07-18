import { RequestHandler } from "express";
import PostModel from "../models/post";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getPosts: RequestHandler =  async (req, res, next) => {
    try {
        const posts = await PostModel.find().exec();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export const getPost: RequestHandler = async (req, res, next) => {

    const postId = req.params.postId;

    try {

        if (!mongoose.isValidObjectId(postId)){
            throw createHttpError(400, "Invalid post id");
        }

        const post = await PostModel.findById(postId).exec();

        if(!post){
            throw createHttpError(404, "Post not found");
        }

        res.status(200).json(post);

    } catch (error) {
        next(error)
    }
}

// Fields might be missing from the reqeust, hence the ?'s
interface CreatePostBody {
    poster?: string
    title?: string,
    description?: string,
    imageFilePath?: string
}

export const createPost: RequestHandler<unknown, unknown, CreatePostBody, unknown> = async (req, res, next) => {
    
    // TODO: Handle images
    const {poster, title, description} = req.body;

    try {
        if (!poster || !title || !description){
            throw createHttpError(400, "Post must have a poster, title, and description");
        }

        const newPost = await PostModel.create({
            poster: poster,
            title: title,
            description: description
        });

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
}

interface UpdatePostParams {
    postId: string
}

interface UpdatePostBody {
    title?: string,
    description?: string,
    imageFilePath?: string
}

export const updatePost: RequestHandler<UpdatePostParams, unknown, UpdatePostBody, unknown> = async (req, res, next) => {

    const {title : newTitle, description : newDescription} = req.body;
    const postId = req.params.postId;

    // Check the postId, if its valid, then make the update
    // ODO: Only the original poster of the post should be allowed to make the update
    // If its invalid, dont do any updates

    try {
        
        if(!mongoose.isValidObjectId(postId)){
            throw createHttpError(400, "Invalid post id");
        }

        if (!newTitle || !newDescription){
            throw createHttpError(400, "Updated post must have a title and description");
        }

        const post = await PostModel.findById(postId).exec();

        if (!post) {
            throw createHttpError(404, "Post not found")
        }

        post.title = newTitle;
        post.description = newDescription;

        const updatedPost = await post.save();

        res.status(200).json(updatedPost);

    } catch (error) {
        next(error)
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {

    const postId = req.params.postId;

    // TODO: Verify that only the original poster can delete this post.

    try {

        if(!mongoose.isValidObjectId(postId)){
            throw createHttpError(400, "Invalid post id");
        }

        const post = await PostModel.findById(postId).exec();

        if (!post){
            throw createHttpError(404, "Post not found");
        }

        await post.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error)
    }
}
