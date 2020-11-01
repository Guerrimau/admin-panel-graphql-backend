'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const { readFileSync } = require('fs');
const { join } = require('path');

const resolvers = require('./src/resolvers');

const app = express();
const port = process.env.PORT || 7070;

app.use( cors() );

const typeDefs = readFileSync(
    join(__dirname, 'src', 'schema.graphql'),
    'utf-8'
)
const schema = makeExecutableSchema( { typeDefs, resolvers} );

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen( port, () => {
    console.log(`Server is listening at http://localhost:${ port }/api`)
})