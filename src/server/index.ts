import express from 'express';

const app = express();
const port = 3000;

import * as routes from "./routes";

// This offloads the request to the root router.
app.use('/', routes.root);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});