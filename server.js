const express = require('express');
const dotenv = require('dotenv');
const restAPI = require('./src/api/restful')


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/', restAPI);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});