const low = require("lowdb");
const faker = require("faker");
const _ = require("lodash");
const helper = require("../helper");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../db.json");
const db = low(adapter);
// Set some defaults
const ppvArr = ["Boxing Match Rule", "OlympicGames", "1 Day Access"];
const transcoderTypeArr = ["FLS Software", "DVEO Hardware", "Mware CloudTV"];
const outputTypeArr = ["DASH 1", "DASH 2", "DASH 3"];
const drvArr = ["drv 1", "drv 2", "drv 3"];
const cdnHoscdnHostArrtArr = ["cdn 1", "cdn 2", "cdn 3"];

(async () => {
  db.defaults({ channels: [] }).write();

  db.get("channels")
    .remove()
    .write();

  const groups = db
    .get("groups")
    .map("id")
    .value();

  const pakages = db
    .get("pakages")
    .map("id")
    .value();

  const currencies = db
    .get("currencies")
    .map("id")
    .value();

  // console.log("groups", _.take(_.shuffle(groups), 5));
  // return;
  for (let i = 1; i <= 47; i++) {
    db.get("channels")
      .push({
        id: helper.mongoObjectId(),
        // previous_channe_id: _.take(_.shuffle(channelsArray), 1),
        // next_channe_id: _.take(_.shuffle(channelsArray), 1),
        //
        number: faker.random.number(),
        name: faker.name.title(),
        //
        use_transcoder: faker.random.boolean(),
        use_playlist: faker.random.boolean(),
        //
        epg: {
          name: faker.name.findName(),
          description: faker.name.lastName(),
          end: faker.date.past(10),
          start: faker.date.past(3),
          image: faker.image.avatar(),
          offset: faker.random.number(10),
          url: faker.internet.url()
        },
        //
        is_ppv: faker.random.boolean(),
        ppv_name: faker.random.arrayElement(ppvArr),
        //
        transcoders: {
          type: faker.random.arrayElement(transcoderTypeArr),
          name: faker.random.word(),
          source: faker.random.boolean(),
          use_interactive_tv: faker.random.boolean(),
          dvr: faker.random.arrayElement(drvArr),
          output_type: faker.random.arrayElement(outputTypeArr),
          cdn_hostname: faker.random.arrayElement(cdnHostArr),
          use_security: faker.random.boolean(),
          drm: faker.random.boolean()
        },
        image: faker.image.avatar(),
        //
        is_kids_friendly: faker.random.boolean(),
        //
        overlay_enabled: faker.random.boolean(),
        ticker_enabled: faker.random.boolean(),
        preroll_enabled: faker.random.boolean(),
        fingerprint: faker.random.boolean(),
        childlock: faker.random.boolean(),
        show_on_home: faker.random.boolean(),
        //
        currencies: _.take(_.shuffle(currencies), 26),
        groups: _.take(_.shuffle(groups), 3),
        pakages: _.take(_.shuffle(pakages), 2),
        //
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .write();
  }
})();

setTimeout(() => {
  const channelsArray = db
    .get("channels")
    .map("id")
    .value();

  channelsArray.map(item => {
    //console.log("item", item);
    db.get("channels")
      .find({ id: item })
      .assign({
        previous_channe_id: _.take(_.shuffle(channelsArray), 1)[0],
        next_channe_id: _.take(_.shuffle(channelsArray), 1)[0]
      })
      .write();
  });
}, 3000);
