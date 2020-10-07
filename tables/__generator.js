function ddl(name, props){
  const { columns, noPrimaryKey, init } = props;
  return `
    ${ noPrimaryKey ? '' : 'CREATE EXTENSION IF NOT EXISTS "pgcrypto";' }
    CREATE TABLE IF NOT EXISTS "${ name }"(
      ${ noPrimaryKey ? '' : 'id    TEXT    PRIMARY KEY    DEFAULT gen_random_uuid(),' }
      ${ columns }
    );
    ${ !init ? '' : `INSERT INTO ${ name }${ init };` }
  `;
}

const fs = require('fs');
const db = require('../db');
const waterfall = new db.waterfall();


const files = fs.readdirSync(__dirname);

const fns = files.map(file => function(cb){
  if(file.startsWith('__'))return cb();
  const name = file.split('.js')[0];
  const props = require(`./${ name }`);
  const query = ddl(name, props);
  
  waterfall.client.query(query, [], (err) => {
    cb(err);  // err = null | ERROR
  });
});

waterfall.run([
  ...fns
]);