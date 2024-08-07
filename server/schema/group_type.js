const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;
const ExpenseType = require('./expense_type');
const Expense = mongoose.model('Expense');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    expenses: {
      type: new GraphQLList(ExpenseType),
      resolve(parentValue) {
        return Expense.find({ groupId: parentValue.id });
      }
    }
  })
});

module.exports = GroupType;