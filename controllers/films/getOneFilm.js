const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const getOneFilm = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	const sql = "SELECT * FROM films WHERE id = ?";
	db.all(sql, [id], (error, rows) => {
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

module.exports = getOneFilm;
