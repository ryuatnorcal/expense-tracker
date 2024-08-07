const graphql = require('graphql');
const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: require('./query.js'),
  // mutation: require('./mutation')
})