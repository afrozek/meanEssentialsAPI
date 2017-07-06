var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
var ObjectId = require('mongodb').ObjectID;
var User = require('../users/users.model.js');
var Workflow = require('../workflow/workflow.model.js');



///
var DocSchema = new mongoose.Schema(
{	
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: { type: String },
	content: String,
	workflowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow'},
	approvalArray: [],
	currentApprovalUserLevel: String,
	currentStatus: {type: String, enum: ['saved', 'submitted', 'under review', 'approved', 'rejected', 'published']},
	workflowUserStatuses:[
							{ 
								userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
							    status: {type: String, enum: ['submitted', 'under review', 'approved', 'rejected']} 
							}
						 ],
	dateCreated: { type: Date },
	dateModified: { type: Date },
	tags: [],
});

var Doc = mongoose.model('Doc', DocSchema);
module.exports = mongoose.model('Doc', DocSchema);








