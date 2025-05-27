import express from "express";
import { Request, Response } from "express";

// The top-level express object has a Router() method that creates a new router object.
const router = express.Router();

router.get('/', (_req : Request, res : Response) => {
    // Send basic react component to client
    res.send("<h1>Hello World!<h1>");
})

router.get('/error', () => {
    throw new Error('Broken');
})

export default router;
