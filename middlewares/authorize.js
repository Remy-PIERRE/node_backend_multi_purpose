const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
	console.log("Hello authorize !");
	try {
		const token = req.header("authorization").split(" ")[1];
		const decodedToken = jwt.verify(token, "jwt_secret");
		req.userId = decodedToken.userId;

		console.log("I'm guest star !");

		next();
	} catch (error) {
		res
			.status(401)
			.json({ message: "Unauthorized. Please login to existing account." });
	}
};

module.exports = authorize;
