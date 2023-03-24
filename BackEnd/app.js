const express = require('express');
require('dotenv').config();
const cors = require('cors');

const employeesRouter = require('./routes/employees-routes');
const assetsRouter = require('./routes/assets-routes');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

app.use('/employees', employeesRouter);
app.use('/assets', assetsRouter);
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({error: error.message || "Something went wrong"});
})

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);