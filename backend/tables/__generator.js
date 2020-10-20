const dotenv = require('dotenv');
dotenv.config();

function ddl(name, props){
  const { columns, primaryKey, unique, init } = props;
  return `
    CREATE TABLE IF NOT EXISTS "${ name }"(
      ${ columns },
      PRIMARY KEY(${ primaryKey.toString() })
      ${ unique ? `,UNIQUE(${ unique.toString() })` : '' }
    );
    ${ !init ? '' : `INSERT INTO "${ name }"${ init };` }
  `;
}

const fs = require('fs');
const db = require('../db');
const waterfall = new db();


const files = fs.readdirSync(__dirname);

const fns = files.map(file => function(cb){
  if(file.startsWith('__'))return cb();
  const name = file.split('.js')[0];
  const props = require(`./${ name }`);
  const query = ddl(name, props);
  
  waterfall.query(query, err => {
    cb(err);  // err = null | ERROR
  });
});

waterfall.run([
  ...fns
]);