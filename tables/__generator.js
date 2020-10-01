function ddl(name, columns){
  return `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS ${ name }(
      id    TEXT    PRIMARY KEY    DEFAULT gen_random_uuid(),
      ${ columns }
    );
  `;
}

const db = require('../db');
const waterfall = new db.waterfall();



waterfall.run([
  cb => {
    const post = require('./post');
    cb();
    waterfall.client.query(ddl('post', post))
  }
])