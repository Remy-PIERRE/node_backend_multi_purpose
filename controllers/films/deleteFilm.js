const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const deleteFilm = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	const sql = "DELETE FROM films WHERE id = ?";
	db.run(sql, [id], (error) => {
		if (error) return next(new CustomError("Server error", 500));

		return res.status(200).json({ message: "Film succefully deleted" });
	});
});

module.exports = deleteFilm;
