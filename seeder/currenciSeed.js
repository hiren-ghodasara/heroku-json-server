const low = require("lowdb");
const faker = require("faker");
const helper = require("../helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ currencies: [] }).write();

db.get("currencies")
  .remove()
  .write();

for (let i = 1; i <= 100; i++) {
  db.get("currencies")
    .push({
        id: helper.mongoObjectId(),
        name: faker.finance.currencyCode(),
        amount: faker.random.number(5000),
        credits: faker.random.number(3000)
    })
    .write();
}
