const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString } = graphql;

const ExpenseType = new GraphQLObjectType({
  name: 'ExpenseType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    amount: { type: GraphQLInt },
    date: { type: GraphQLString },
    category: { type: GraphQLString },
    tax: { type: GraphQLInt }
  })
});

module.exports = ExpenseType;