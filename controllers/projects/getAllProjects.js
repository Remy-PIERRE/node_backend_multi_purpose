const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const getAllProjects = asyncWrapper(async (req, res, next) => {
	const sql = "SELECT * FROM projects";
	db.all(sql, [], (error, rows) => {
		if (error) return next(new CustomError("No project founded", 404));

		const projects = [];
		rows.forEach((row) => {
			projects.push(row);
		});

		if (projects.length === 0)
			return next(new CustomError("No project founded", 404));
		return res.status(200).json({ ok: true, data: projects });
	});
});

module.exports = getAllProjects;
