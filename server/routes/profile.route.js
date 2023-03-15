const express = require("express");
const router = express.Router();

const { GetUser } = require("../controllers/profile.controllers.js");
const { findUser } = require("../controllers/profile.controllers.js");

router.route("/form").put(GetUser);
router.route("/form").get(findUser);

module.exports = router;
