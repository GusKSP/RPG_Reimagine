var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pgs_rpg_reimagine/index_rpgreimagine");
});

module.exports = router;