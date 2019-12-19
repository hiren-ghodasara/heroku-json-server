const low = require("lowdb");
const faker = require("faker");
const helper = require("../helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ epgUrl: [] }).write();

db.get("epgUrl")
  .remove()
  .write();

for (let i = 1; i <= 45; i++) {
  db.get("epgUrl")
    .push({
      id: helper.mongoObjectId(),
      name: faker.lorem.word(),
      url: faker.internet.url()
    })
    .write();
}
