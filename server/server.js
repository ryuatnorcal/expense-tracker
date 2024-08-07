const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema');
require('dotenv').config();
const app = express();

if (!process.env.MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env');
}
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URL}/expense-tracker`
);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
)

app.get('/', (req, res) => {

  res.send('Hello World!');
})



app.listen(3001, () => {
  console.log('Server is listening on port 3001');
})