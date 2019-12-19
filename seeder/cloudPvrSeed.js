const low = require("lowdb");
const faker = require("faker");
const helper = require("../helper");
const _ = require("lodash");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ cloudPvr: [] }).write();

db.get("cloudPvr")
  .remove()
  .write();

const channels = db
  .get("channels")
  .map("id")
  .value();

for (let i = 1; i <= 100; i++) {
  db.get("cloudPvr")
    .push({
      id: helper.mongoObjectId(),
      channel: _.take(_.shuffle(channels), 1)[0],
      programme_name: faker.lorem.word(),
      end: faker.date.past(10),
      start: faker.date.past(3),
      date: faker.date.past(3),
      gbs: faker.finance.amount(1,4),
      total: faker.finance.amount(0,1,3),
    })
    .write();
}
