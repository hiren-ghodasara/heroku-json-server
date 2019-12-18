const express = require("express");
const router = express.Router();
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("db.json");
const db = low(adapter);

router.post("/re-order-position", (req, res, next) => {
  //   const dbAccss = routerDB.db;
  const SourceIndex = req.body.source.index;
  const destinationIndex = req.body.destination.index;
  const draggableId = req.body.draggableId;
  // do your db stuff

  let responce = {};
  let condition1 = "";
  let condition2 = "";

  const groupsArray = db
    .get("groups")
    //.find({ title: "low!" })
    .filter(v => {
      //console.log("v",v);
      if (SourceIndex > destinationIndex) {
        //forword
        condition1 = v.position >= destinationIndex;
        condition2 = v.position < SourceIndex;
        responce.direction = "up direction";
      } else {
        //backword
        condition1 = v.position <= destinationIndex;
        condition2 = v.position > SourceIndex;
        responce.direction = "down direction";
      }
      return (condition1 && condition2) || v.id === draggableId;
    })
    // .map(item => {
    //   // if (item.id === draggableId) {
    //   //   return { ...item, position: destinationIndex };
    //   // }
    //   return { ...item, position: item.position + 1 };
    // })
    .value();
  groupsArray.map(item => {
    //console.log("item", item);
    db.get("groups")
      .find({ id: item.id })
      .assign({
        preposition: item.position,
        position:
          item.id === draggableId
            ? destinationIndex
            : SourceIndex > destinationIndex
            ? item.position + 1
            : item.position - 1
      })
      .write();
  });
  responce.data = groupsArray;
  return res.json(responce);
});

module.exports = router;
