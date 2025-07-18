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


