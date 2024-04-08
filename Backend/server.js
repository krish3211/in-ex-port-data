const express = require('express');
const cors = require('cors');
const {PORT} = require("./config");
// importing database
const connectToMongo = require('./Database');

// checking data fuction
connectToMongo();
const app = express();
const port = PORT || 5000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent and received
};


app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/store', require('./routes/components'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})