const express = require('express');
require('dotenv').config();

const employeesRouter = require('./routes/employees-routes');
const assetsRouter = require('./routes/assets-routes');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/employees', employeesRouter);
app.use('/assets', assetsRouter);
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({error: error.message});
})

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);