const graphql = require('graphql');
// const expense = require('../models/expense');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLString } = graphql;
const Expense = mongoose.model('Expense');

const ExpenseType = new GraphQLObjectType({
  name: 'ExpenseType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLString },
    category: { type: GraphQLString },
    tax: { type: GraphQLFloat },
    group: {
      type: require('./group_type'),
      resolve(parentValue) {
        return Expense
          .findById(parentValue)
          .populate('group')
          .then(expense => expense.group);
      }
    }
  })
});

module.exports = ExpenseType;