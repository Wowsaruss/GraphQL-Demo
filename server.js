// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port = 4000;

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
