const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const getAllFilms = asyncWrapper(async (req, res, next) => {
	const sql = "SELECT * FROM films";
	db.all(sql, [], (error, rows) => {
		if (error) return next(new CustomError("No film founded", 404));

		const films = [];
		rows.forEach((row) => {
			films.push(row);
		});

		if (films.length === 0)
			return next(new CustomError("No film founded", 404));
		return res.status(200).json({ ok: true, data: films });
	});
});

module.exports = getAllFilms;
