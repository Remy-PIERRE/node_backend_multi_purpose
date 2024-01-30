const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const addProject = asyncWrapper(async (req, res, next) => {
	console.log("Hello add project ! :", req.body.title);

	// const { title, description, image, link } = req.body;
	const { title, description, link } = req.body;

	console.log("Hello project !: ", title, description, link);

	const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${
		req.file.filename
	}`;

	console.log("project: ", imageUrl);

	if (!title || !description || !imageUrl || !link)
		return next(new CustomError("Bad request", 400));

	const sql =
		"INSERT INTO projects (title, description, image, link) VALUES(?, ?, ?, ?)";
	db.run(sql, [title, description, imageUrl, link], (error) => {
		if (error) return next(new CustomError("Server error", 500));

		return res
			.status(200)
			.json({ ok: true, message: "Project succefully created" });
	});
});

module.exports = addProject;
