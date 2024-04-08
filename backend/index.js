const express = require("express");
const cors = require("cors");
const multer = require("multer");
const csvtojson = require("csvtojson");
const fs = require("fs");
const connecttomongo = require("./db");
const items = require("./items");
const app = express();
const upload = multer({ dest: "uploads/" });

// Enable CORS for all routes
app.use(cors());

connecttomongo();

app.post("/upload", upload.single("csvFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const csvFilePath = req.file.path;

  csvtojson()
    .fromFile(csvFilePath)
    .then(async (jsonArray) => {
      // Delete the uploaded file after converting to JSON
      fs.unlink(csvFilePath, (err) => {
        if (err) {
          console.error("Error deleting CSV file:", err);
        }
      });
    //   const responce = await items.insertMany(jsonArray);
      // res.json(jsonArray);
      res.send(jsonArray);
    })
    .catch((error) => {
      console.error("Error converting CSV to JSON:", error);
      res.status(500).json({ error: "Failed to convert CSV to JSON" });
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
