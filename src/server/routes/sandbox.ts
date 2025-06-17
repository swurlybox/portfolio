import express from "express";
import { Request, Response } from "express";
import path from "path";

// The top-level express object has a Router() method that creates a new router object.
const router = express.Router();

router.get('/video_audio', (_req : Request, res : Response) => {
    // TODO: Send basic react component to client
    
    // For now though, send an html file;
    res.sendFile(path.join(process.cwd(), "src", "server", "views", "sandbox", "video_audio.html"));
})

export default router;