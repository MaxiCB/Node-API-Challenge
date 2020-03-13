const express = require("express");

const router = express.Router();

const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

router.use(express.json());

module.exports = router;