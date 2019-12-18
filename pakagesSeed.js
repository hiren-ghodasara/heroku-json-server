const low = require("lowdb");
const faker = require("faker");
const helper = require("./helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ pakages: [] }).write();

db.get("pakages")
  .remove()
  .write();

for (let i = 1; i <= 17; i++) {
  db.get("pakages")
    .push({
      id: helper.mongoObjectId(),
      name: faker.address.country()
    })
    .write();
}
