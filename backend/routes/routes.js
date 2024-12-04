const express = require("express");
const { fetchRepo, fetchPrevData } = require("../controllers/user.controller");
const routes = express.Router();

routes.get("/fetch-repos", fetchRepo);
routes.get("/prev-data", fetchPrevData);

module.exports = routes; 
