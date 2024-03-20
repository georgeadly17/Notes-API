const express = require("express");
const router = express.Router();

router.route("/login").post((req, res) => {
  res.status(201).json({ msg: "The User is loged in :)" });
});

module.exports = router;
