const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;
const ExpenseType = require('./expense_type');
const Group = mongoose.model('Group');
const Expense = mongoose.model('Expense');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    expenses: {
      type: new GraphQLList(ExpenseType),
      resolve(parentValue) {
        return Group
          .findById(parentValue._id)
          .populate('expenses')
          .then(group => {
            return group.expenses
          });
      }
    }
  })
});

module.exports = GroupType;