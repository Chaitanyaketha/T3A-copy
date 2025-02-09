const express = require("express");
const importData = require("./imports-file.controller");
const verifyRole = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post("/add", verifyRole(["admin"]), importData.importData);
router.get("/get-imports", importData.exportData);
module.exports = router;
