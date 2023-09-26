const express =require( 'express'); 
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const rootValue = require('./resolvers/resolver')
const db=require('./config/db')
db();
const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
    }),
  );
app.listen({ port: 4000 });
console.log('Listening to port 4000');