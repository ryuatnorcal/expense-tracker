const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const GroupType = require('./group_type');
const ExpenseType = require('./expense_type');
const Group = mongoose.model('Group');
const Expense = mongoose.model('Expense');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    groups: {
      type: new GraphQLList(GroupType),
      resolve() {
        return Group.find({});
      }
    },
    group: {
      type: GroupType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Group.findById(args.id);
      }
    },
    expenses: {
      type: new GraphQLList(ExpenseType),
      resolve() {
        return Expense.find({});
      }
    },
    expense: {
      type: ExpenseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Expense.findById(args.id);
      }
    }
  }
});

module.exports = RootQuery;
