const express = require("express");
const router = express.Router();
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const _ = require("lodash");
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

router.get("/get-channel-by-group/:group_id", (req, res, next) => {
  //   const dbAccss = routerDB.db;
  const group_id = req.params.group_id;
  // do your db stuff
  const groups = db
    .get("channels")
    .filter(v => {
      return _.includes(v.groups, group_id);
    })
    .value();
  res.setHeader("X-Total-Count", groups.length);
  //res.setHeader("X-Total-Count", chain.size());
  res.setHeader("Access-Control-Expose-Headers", `X-Total-Count`);
  res.status(200).send(groups);
});

module.exports = router;
