import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

interface CreateUserBody {
    username?: string,
    password?: string,
    nickname?: string,
    email?: string
}

/**
 * 
 * @param user 
 * @returns
 * @throws {Error} containing list of validation error messages
 */
const validateCreateUserBody = (user: CreateUserBody) => {
    const validationErrors: string[] = [];

    // Empty fields
    if(!user.username || !user.password || !user.nickname || !user.email){
        validationErrors.push("At least one of the required fields is empty");
        throw createHttpError(400, validationErrors.toString());
    }

    /** 
     * Validate username
     * 5-30 characters
     * alphanumeric, underscores, periods, or dashes
     */
    if(user.username.length >= 5 && user.username.length <= 30){
        const regex = new RegExp("^[\\w\\.\\-]+$");
        const match = regex.test(user.username);
        if(!match){
            validationErrors.push("Username failed requirements: alphanumeric, underscores, periods, dashes only");
        }
    } else { validationErrors.push("Username failed length check: 5-30 characters"); }

    /**
     * Validate password
     * 8-30 characters
     * No restriction on allowed characters
     * Atleast 1 uppercase, lowercase, number, special character ( !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~)
     */
    if(user.password.length >= 8 && user.password.length <= 30){
        const regex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ !\\\"#$%&'()*+,\\-.\\/:;<=>?@[\\]^_`{|}~]).+$");
        const match = regex.test(user.password);
        if(!match){
            validationErrors.push("Password failed requirements: Atleast 1 uppercase, lowercase, number, special character ( !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)");
        }
    } else { validationErrors.push("Password failed length check: 8-30 characters"); }

    /** 
     * Validate nickname
     * Length 5-30 characters, alphanumeric, underscores, periods, dashes
     */
    if(user.nickname.length >= 5 && user.nickname.length <= 30){
        const regex = new RegExp("^[\\w\\.\\-]+$");
        const match = regex.test(user.nickname);
        if(!match){
            validationErrors.push("Nickname failed requirements: alphanumeric, underscores, periods, dashes only");
        }
    } else { validationErrors.push("Nickname failed length check: 5-30 characters"); }

    /**
     * Validate email
     * Length 256 characters
     * Atleast 1 @ symbol and 1 . symbol, with non-empty strings in between
     */
    if(user.email.length >= 5 && user.email.length <= 256){
        const regex = RegExp(".+@.+\\..+");
        const match = regex.test(user.email);
        if(!match){
            validationErrors.push("Email failed requirements: Atleast 1 @ and 1 . symbol, with non-empty strings in between");
        }
    } else { validationErrors.push("Password failed length check: 8-30 characters") }

    if(validationErrors.length != 0){
        throw createHttpError(400, validationErrors.toString());
    }

    return;
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    // From the login form, we expect the following data in the body.
    /**
     * all required.
     * username
     * password
     * nickname
     * email
     * 
     * we'll need to:
     * 
     * validate all fields
     * encrypt the password
     * store all info on db
     */

    const {username, password, nickname, email} = req.body;

    try {

        validateCreateUserBody({username, password, nickname, email});

        // Validation

        // Interact with db, checking for uniqueness of username and email

        // Before inserting into db, send to the client's email address a verification code

        // Once verified, create the user and redirect them to the home page.

        // If not verified after a time limit
        


        res.status(200).send("User passed validation");

        
    } catch (error) {
        next(error);
    }
}