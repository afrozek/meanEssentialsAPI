var mongoose = require('mongoose');
var User = require('./users.model.js');

var ObjectId = require('mongodb').ObjectID;

var BudgetSchema = new mongoose.Schema({
    owner: { type: String},
    accountName: {type: String, required: true },
    income: {
        monthly: {type: Number},
        yearly: {type: Number}
    },
    transactionCategories:[
        {   
            categoryType: { type: String, enum: ['bill', 'budget']},
            name: {type: String , required: true},
            amount: {type: Number , required: true},
            balance: {type: Number }
        }
    ],
    transactions:[{
        name: {type: String , required: true},
        transactionType: {
            categoryType: {type: String , enum: ['bill', 'budget', 'none'] ,required: true},
            name: {type: String},
        },
        amount: {type: Number , required: true},
        balance: {type: Number },
        note: {type: String},
        tags: [ {type: 'String'} ]
    }]
    
});



var Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;