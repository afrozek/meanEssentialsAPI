var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');



///
var UserSchema = new mongoose.Schema({
	email: {type: String, unique: true},
    password: { type: String, required: true},
	userLevel: {
					type: String,
					enum:['superuser', 'admin', 'user'],
					default: "user"
				},
	dateCreated: {type: Date}
});

var User = mongoose.model('User', UserSchema);

// UserSchema.methods.comparePasswords = function(password, callback){
// 	bcrypt.compare(password, this.password, callback);
// }


///

UserSchema.pre('find', function(next){
    console.log('finddd')
})

UserSchema.pre('save', function(next){
    console.log("inside userscheme pre");
	var user = this;

	// if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err,salt){
		if(err){
            console.log(err);
            return next(err);
        } 

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
                console.log(err);
                return next(err);
            } 

			user.password = hash;
            console.log(user.password)
			next();
		})
	})
})



module.exports = mongoose.model('User', UserSchema);