const express = require("express");
const _deathController = require("../controllers/Deathcertificate");
const multer = require('multer');
const { upload } = require('../helpers/uploader');
// const path = require('path');
const router = new express.Router();

router.post("/create", _deathController.store);
router.post("/update", _deathController.update);
router.get('/getAll', _deathController.index);
router.get('/validate/', _deathController.show);

module.exports = router;
