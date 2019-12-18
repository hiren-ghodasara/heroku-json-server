const router = require("express").Router();

// web
// router.get("/", (req, res) => {
//   res.status(200).send({
//     text: "Hello!",
//   });
// });

// api
router.use("/groups", require("./group"));

module.exports = router;
