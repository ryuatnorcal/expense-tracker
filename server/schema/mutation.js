const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt } = graphql;
const Group = mongoose.model('Group');
const Expense = mongoose.model('Expense');
const GroupType = require('./group_type');
const ExpenseType = require('./expense_type');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGroup: {
      type: GroupType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name }) {
        return new Group({ name }).save();
      }
    },
    addExpense: {
      type: ExpenseType,
      args: {
        groupId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        tax: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { groupId, name, amount, date, category, tax }) {
        return new Expense({ groupId, name, amount, date, category, tax }).save();
      }
    },
    deleteExpense: {
      type: ExpenseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Expense.remove({ _id: id });
      }
    },
    deleteGroup: {
      type: GroupType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Group.remove({ _id: id });
      }
    },
    editExpense: {
      type: ExpenseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        date: { type: GraphQLString },
        category: { type: GraphQLString },
        tax: { type: GraphQLInt }
      },
      resolve(parentValue, { id, name, amount, date, category, tax }) {
        return Expense.findOneAndUpdate({ _id: id }, { $set: { name, amount, date, category, tax } });
      }
    }
  }
}); 

module.exports = mutation;