const db = require("../../utils/configDB");
const asyncWrapper = require("../../middlewares/asyncWrapper");
const CustomError = require("../../models/CustomError");

const addFilm = asyncWrapper(async (req, res, next) => {
	console.log("Hello add film ! :", req.body.title);

	// const { title, description, image, link } = req.body;
	const { title, description, rating } = req.body;

	// console.log("Hello film !: ", title, description, rating);

	const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${
		req.file.filename
	}`;

	let finalRating;
	if (!rating) finalRating = -1;
	else finalRating = rating;

	console.log("project: ", imageUrl);

	if (!title || !description || !imageUrl)
		return next(new CustomError("Bad request", 400));

	const sql =
		"INSERT INTO films (title, description, image, rating) VALUES(?, ?, ?, ?)";
	db.run(sql, [title, description, imageUrl, finalRating], (error) => {
		if (error) return next(new CustomError("Server error", 500));

		return res
			.status(200)
			.json({ ok: true, message: "Film succefully created" });
	});
});

module.exports = addFilm;
