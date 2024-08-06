const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }]
});


export default mongoose.model('Group', groupSchema)