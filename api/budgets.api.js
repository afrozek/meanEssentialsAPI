module.exports = budgetsApi;

var User = require('./users.model.js');
var Budget = require('./budgets.model.js')
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
// var _find = require('lodash.find');




// api routes
function budgetsApi (app, express) {

	var budgetsApi = express.Router();
	




// add a user
	budgetsApi.post('/', function (req, res) {


	//extract reqbody data
		//gen info
	


    // ok no dupes, create and save user


    //caclulations
    var monthlyIncome = req.body.monthlyIncome;
    var yearlyIncome = monthlyIncome * 12;
    var bills = {
        billType: 'monthly',
        name: 'phone',
        amount: 40,
        paid: false
    }

    var budgets = {
        name: 'food',
        amount: 100,
    }

    //new user object
        var budget = new Budget();
        budget.owner = req.body.email;
        budget.accountName = req.body.accountName;
        budget.income = {"monthly":  monthlyIncome, "yearly": yearlyIncome};
        budget.bills = bills;
        budget.budgets = budgets;
        // console.log(req.body.income);


    // save to mongo
        budget.save(function(err, result){
            if(err) return res.status(400).json( { success: false , message: err });
            res.status(200).json({ success: true, message: "Budget Created", result: result });				
                
        })

	}); //end post addUser


//middleware
// var authApi = require('./auth.api.js')(express);
// budgetsApi.use(authApi);	



// get all users
	budgetsApi.get('/all', function (req, res) {

			//return all users , except password field
			User.find({},{ password: 0}, function(err, users){
				if(!err)res.json({ success: true, users: users});
			})

	});



// update a user
	budgetsApi.put('/update', function (req, res) {

			//get body data
			// var form = {};
			// form.username = req.body.username;
			// form.updateField = req.body.updateField;
			// form.updateValue = req.body.updateValue;

			
			
	}); //end put updateUser


//delete a user
	budgetsApi.delete('/delete', function (req, res) {

			//get body data
			// var form = {};
			// form.username = req.body.username;
			
			
	}); //end put deleteUser 


	return budgetsApi;
}



	function createSendToken (user, res, message) {

		var payload = {
			//iss: req.hostname,
			userId: user.id,
			email: user.email,
		}

		var secret = "xdS&#((*#@)DKS()#@!@";

		var options = {
			expiresIn: "2 days"
		}

		var token = jwt.sign( payload, secret, options, function(err, token){
			if(err) res.status(500).json({ success: false, message: "sorry something went wrong..." })
			else res.status(200).json({ success: true, token: token, message: "Login Success!"});
		})
			     
	}

	/*-----COMMENTED OUT BECAUSE REPLACED WITH MIDDLEWARE-----*/
	//send 401 on fail
	//takes a optional callback which sends decoded token
	// function verifyToken(req, res, callback) {

	// 	//check for token
	// 	if(!req.headers.token)
	// 		return res.status(401).json({ success: false, message:'You are not authorized to view this page' })

		

	// 	//token present, decode token
	// 	var token = req.headers.token;
	// 	var payload = jwt.verify(token, 'xdS&#((*#@)DKS()#@!@', function(err, decoded) {

	// 		// //problem verifying token
	// 		if(err) return res.status(401).json({ success: false, message:'Authentication Failed', error: err })

	// 		//call em back with decoded token	
	// 		if(callback) 
	// 		callback(decoded);
			

	// 	});


	// }


