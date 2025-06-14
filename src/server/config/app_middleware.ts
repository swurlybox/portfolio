/*******************************************************************************
* File          : app_middleware.ts
* Project       : Portfolio
* Author        : swurlybox
* 
* Description   : Loads application-level middleware functions that're binded to
*                 the top-level Express application.
*******************************************************************************/

import { Express } from "express"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import configureLivereload from "./livereload";


const server = (app : Express) => {
    dotenv.config();            // .env credentials

    app.use(cors());            // enables Cross-Origin Resource Sharing
    app.use(express.json())     // parses requests w/ application/json as JSON
    configureLivereload(app);   // monkey-patch livereload script on all html files

    console.log("Server has been configured");
}

export default server;