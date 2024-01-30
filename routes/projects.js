const express = require("express");
const getAllProjects = require("../controllers/projects/getAllProjects");
const authorize = require("../middlewares/authorize");
const multer = require("../middlewares/multer");
const addProject = require("../controllers/projects/addProject");
const deleteProject = require("../controllers/projects/deleteProject");

const router = express.Router();

router.route("/").get(getAllProjects).post(authorize, multer, addProject);
router.route("/:id").delete(authorize, deleteProject);

module.exports = router;
