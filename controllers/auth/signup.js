const bcrypt = require("bcryptjs");
const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const signup = asyncWrapper(async (req, res, next) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name)
		return next(new CustomError("Bad request", 400));

	const hashedPassword = await bcrypt.hash(password, 10);

	const sql = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
	db.run(sql, [email, hashedPassword, name], (error) => {
		if (error) return next(new CustomError("User not created", 403));
		else return res.status(201).json({ message: "User created with success." });
	});
});

module.exports = signup;
