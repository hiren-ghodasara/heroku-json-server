const low = require("lowdb");
const faker = require("faker");
const helper = require("./helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ groups: [] }).write();

db.get("groups")
  .remove()
  .write();

for (let i = 1; i <= 17; i++) {
  db.get("groups")
    .push({
      id: helper.mongoObjectId(),
      position: i,
      name: faker.random.word()
    })
    .write();
}
