const low = require("lowdb");
const faker = require("faker");
const helper = require("../helper");
const _ = require("lodash");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ epgOverView: [] }).write();

db.get("epgOverView")
  .remove()
  .write();

const channels = db
  .get("channels")
  .map("id")
  .value();

for (let i = 1; i <= 45; i++) {
  db.get("epgOverView")
    .push({
      id: helper.mongoObjectId(),
      channel_id: _.take(_.shuffle(channels), 1)[0],
      name: faker.name.findName(),
      description: faker.name.lastName(),
      end: faker.date.past(10),
      start: faker.date.past(3),
      image: faker.image.avatar(),
      offset: faker.random.number(10),
      url: faker.internet.url()
    })
    .write();
}
