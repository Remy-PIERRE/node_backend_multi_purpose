const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const deleteProject = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	const sql = "DELETE FROM projects WHERE id = ?";
	db.run(sql, [id], (error) => {
		if (error) return next(new CustomError("Server error", 500));

		return res.status(200).json({ message: "Project succefully deleted" });
	});
});

module.exports = deleteProject;
