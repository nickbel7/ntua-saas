const path = require('path')
const express = require('express')
const router = express.Router();

router.get("/flows", function(req, res) {
	res.render(path.join(__dirname, '..') + "/templates/flows.html");
});

module.exports = router;