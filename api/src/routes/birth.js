const express = require("express");
const _birthController = require("../controllers/Birthcertificate");
const multer = require('multer');
const { upload } = require('../helpers/uploader');
// const path = require('path');
const router = new express.Router();

router.get("/", async (req, res) => {
    res.send("Hello Nites");
    console.log('test')
});

router.post("/create", _birthController.store);
router.post("/update", _birthController.update);
router.get('/getAll', _birthController.index);
router.post('/import', upload('file'), _birthController.importData);
router.get('/validate/', _birthController.show);
router.get('/filter/', _birthController.filterBirthCert);

module.exports = router;
