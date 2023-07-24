var express = require("express");
var router = express.Router();
// const connection = require("../db/database.js");
const uploadImage = require("../helpers/helpers");

router.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    console.log("hi2");

    console.log(imageUrl, "hi");
    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
