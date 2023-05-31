const express = require("express");
const _birthRoute = require("./birth")
const _deathRoute = require("./death")
const router = new express.Router();
/**
 * Primary app routes.
 */
router.use("/birthcertificate", _birthRoute);
router.use("/deathcertificate", _deathRoute);

module.exports = router;
