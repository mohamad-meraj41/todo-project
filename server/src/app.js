const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoDB = require('./utils/db');
const todoRoutes = require('./routes/todoRoutes');

const port = process.env.PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());

mongoDB();

app.use('/api/todos', todoRoutes);


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})