const path = require('path')
const express = require('express')
const router = express.Router();

router.get("/generation", function(req, res) {
	res.render(path.join(__dirname, '..') + "/templates/generation.html");
});

module.exports = router;