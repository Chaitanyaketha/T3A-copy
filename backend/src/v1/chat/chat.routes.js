const express = require("express");
const router = express.Router();

// Sample chat history endpoint (Optional: Save chat messages in DB)
router.get("/history", (req, res) => {
    res.json({ message: "Chat history API will be implemented here." });
});

module.exports = router;
