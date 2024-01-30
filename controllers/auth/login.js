const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const login = asyncWrapper(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) return next(new CustomError("Bad request", 400));

	const sql = "SELECT * FROM users WHERE email = ?";
	db.all(sql, [email], async (error, rows) => {
		if (error) return next(new CustomError("User not finded", 404));
		else {
			const user = rows[0];

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return next(new CustomError("User not finded", 404));

			const token = jwt.sign({ userId: user.id }, "jwt_secret");
			res.status(200).json({ user: { id: user.id, name: user.name }, token });
		}
	});
});

module.exports = login;
