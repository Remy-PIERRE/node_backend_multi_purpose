const CustomError = require("../models/CustomError");

const badRouteHandler = (req, res, next) => {
	return next(new CustomError("This route does not exists", 404));
};

module.exports = badRouteHandler;
