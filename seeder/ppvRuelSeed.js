const low = require("lowdb");
const faker = require("faker");
const helper = require("../helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
const typeArr = ["Hours", "Days", "Months", "Years"];
// Set some defaults
db.defaults({ ppvRules: [] }).write();

db.get("ppvRules")
  .remove()
  .write();

for (let i = 1; i <= 22; i++) {
  db.get("ppvRules")
    .push({
      id: helper.mongoObjectId(),
      name: faker.random.word(),
      type: faker.random.arrayElement(typeArr)
    })
    .write();
}
