const path = require('path')
const express = require('express')
const router = express.Router();

router.get("/total", function(req, res) {
	res.render(path.join(__dirname, '..') + "/templates/total.html");
});

module.exports = router;