const express = require("express");
const authorize = require("../middlewares/authorize");
const multer = require("../middlewares/multer");
const getAllFilms = require("../controllers/films/getAllFilms");
const getOneFilm = require("../controllers/films/getOneFilm");
const addFilm = require("../controllers/films/addFilm");
const updateFilm = require("../controllers/films/updateFilm");
const deleteFilm = require("../controllers/films/deleteFilm");

const router = express.Router();

router.route("/").get(getAllFilms).post(authorize, multer, addFilm);
router
	.route("/:id")
	.get(getOneFilm)
	//.post(authorize, updateFilm)
	.delete(authorize, deleteFilm);

module.exports = router;
