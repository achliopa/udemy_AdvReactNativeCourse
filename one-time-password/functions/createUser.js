const admin = require('firebase-admin');

module.exports = function(req,res) {
	// verify user provided a phone
	if (!req.body.phone) {
		res.status(422).send({error: 'Bad Input'});
	}
		// format the phone number removing dashes and parenthesis
	// const phone = String(req.body.phone).replace(/[^\d]/g,"");
	
	//twilio needs + character to work with foreign numbers
	const phone = String(req.body.phone);
	// create a new user account using that phone neumber
	admin.auth().createUser({ uid: phone })
		.then(user=>res.send(user))
		.catch(err => res.status(422).send({ error: err }));
	// respond to the user saying the account was made
}