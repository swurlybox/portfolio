import {Express} from "express";
import livereload from "livereload";
import connect_livereload from "connect-livereload";
import path from "path";

// Shoutouts to stackOverflow linking to this article
// https://bytearcher.com/articles/refresh-changes-browser-express-livereload-nodemon/
const configureLivereload = (app : Express) => {
    if (process.env.NODE_ENV !== "development"){
        return;
    }

    const livereloadServer = livereload.createServer();
    const livereloadClient = connect_livereload();

    // Watch for code changes in the js files
    // Any changes to the files in the dist directory will tell the client to refresh their browser
    livereloadServer.watch(path.join(process.cwd(), "dist"));

    // When nodemon restarts, it kills the previous livereload server as well.
    // However, the client will still have the livereload script.

    // When the connection is reestablished, we broadcast a refresh message from the livereload server to
    // all other livereload clients with a WebSocket. This section of code is necessary.

    // After nodemon has finished, we may have already updated some files. But livereload is setup after the changes
    // have happened, so when the livereload server is setup to watch for code changes, it doesn't account for the code
    // changes that already have happened. That's why we need this connection event-handler to refresh after a connection
    // is established. (I UNDERSTAND IT NOW)
    livereloadServer.server.once("connection", () => {
        setTimeout(() => {
            livereloadServer.refresh("/");
        }, 100);
    })

    app.use(livereloadClient);
}

export default configureLivereload;