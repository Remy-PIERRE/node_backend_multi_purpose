const CustomError = require("../models/CustomError");

const errorHandler = (error, req, res, next) => {
	if (error instanceof CustomError)
		return res.status(error.status).json({ message: error.message });
	else return res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
