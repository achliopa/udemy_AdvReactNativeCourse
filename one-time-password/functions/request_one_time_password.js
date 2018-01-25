const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req,res) {
	if(!req.body.phone) {
		return res.status(422).send({ error: 'You must provide a phone number'});
	}
	// format the phone number removing dashes and parenthesis
	// const phone = String(req.body.phone).replace(/[^\d]/g,"");
	
	//twilio needs + character to work with foreign numbers
	const phone = String(req.body.phone);
	admin.auth().getUser(phone)
		.then(userRecord => {
			const code = Math.floor(Math.random() * 8999 + 1000);

			twilio.messages.create({
				body: "Your Agileng OTPApp login code is " + code,
				to: phone,
				from: " +16178556875"
			}, (err) => {
				if(err) {return res.status(422).send({ error: err});}

				admin.database().ref('users/' + phone)
				.update({ code , codeValid: true }, () => {
					res.send({ success: true});
				});

			});
		})
		.catch((err) => {
			res.status(422).send({ error: err});
		});
}

