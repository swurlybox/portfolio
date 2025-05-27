/*******************************************************************************
* File          : index.ts
* Project       : Portfolio
* Author        : swurlybox
* 
* Description   : Main driver for portfolio web-app.
*******************************************************************************/

import express from "express";
import { Request, Response, NextFunction } from "express";

import * as config from "./config"
import * as routes from "./routes";

const app = express();
config.server(app);
const PORT = process.env.PORT || 3000;

// This offloads the request to the root router.
app.use('/', routes.root);











// Default error-handling route if all else fails. Express invokes this
// function on any thrown errors, or through a next(err) call where err
// is the Error object.
app.use((err : Error, _req: Request, res : Response, _next : NextFunction) => {
  console.error(err.stack);
  res.status(500).send(`Something broke!`);
})

// Starts the server on a specific port number.
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});