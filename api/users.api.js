module.exports = usersApi;

var User = require('./users.model.js');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
// var _find = require('lodash.find');




// api routes
function usersApi (app, express) {

	var usersApi = express.Router();
	


// login
	usersApi.post('/login', function (req, res) {
		console.log("loginAPI")
		//extract reqbody data
		var email = req.body.email;
		var password = req.body.password;

		//search for user email
		User.findOne({ email: email }, function(err, user) {
			if(err) throw err;

			//if email doesnt exist
			if(!user) return res.status(200).json({ success: false, message: "A user with that Email does not exist" })

			//email does exist, verify the password	
			bcrypt.compare(password, user.password, function (err, isMatch){
				//if(er) throw err;

				if(isMatch) createSendToken(user, res);
				else return res.status(200).json({ success: false, message: "Wrong Password" })
			})//end compare

		})//end find

	}); //end login




// add a user
	usersApi.post('/signup', function (req, res) {


	//extract reqbody data
		//gen info
		var form = {};
		form.email = req.body.email;
		form.password = req.body.password;


		for(var field in form){
			if(form.hasOwnProperty(field)){
				if(!form[field]){
					message = field + " is a required field";
					return res.status(400).json({success: false, message: message})
				}
			}
		}


		//check for duplicate email values
		User.find({ email: form.email }, function(err, data){
			if(err) res.json(err)
			if (data.length >= 1){
				return res.json({ success: false, message : "a user with that email already exists"})
			}
			else{


			}//end else
		})//end find

			// ok no dupes, create and save user

			//new user object
				var newUser = new User({
					email: form.email,
					password: form.password,
					dateCreated: Date()
				})

			// save to mongo
				newUser.save(function(err,user){
					if(err) return res.json( { success: false }, { message: err });
					res.status(200).json({ success: true, message: "User Created", user:user });				
						
				})

	}); //end post addUser


//middleware
// var authApi = require('./auth.api.js')(express);
// usersApi.use(authApi);	



// get all users
	usersApi.get('/all', function (req, res) {

			//return all users , except password field
			User.find({},{ password: 0}, function(err, users){
				if(!err)res.json({ success: true, users: users});
			})

	});



// update a user
	usersApi.put('/update', function (req, res) {

			//get body data
			// var form = {};
			// form.username = req.body.username;
			// form.updateField = req.body.updateField;
			// form.updateValue = req.body.updateValue;

			
			
	}); //end put updateUser


//delete a user
	usersApi.delete('/delete', function (req, res) {

			//get body data
			// var form = {};
			// form.username = req.body.username;
			
			
	}); //end put deleteUser 


	return usersApi;
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


