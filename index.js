require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routers/user.router'));

app.listen(process.env.PORT, () => {
  console.log(`Corriendo en el puerto: ${process.env.PORT}`);
});