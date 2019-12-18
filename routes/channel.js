const express = require("express");
const router = express.Router();
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("db.json");
const db = low(adapter);

router.post("/re-order-position", (req, res, next) => {
  //   const dbAccss = routerDB.db;

  // do your db stuff
  const groups = db
    .get("groups")
    //.map("id")
    .value();

  res.status(200).send(groups);

  if (SourceIndex > destinationIndex) {
    //forword
  } else {
    //backword
  }
});

module.exports = router;
