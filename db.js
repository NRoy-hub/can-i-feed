const { Pool } = require('pg');
const async = require('async');


const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'canifeed',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  statement_timeout: 10000
}

console.log(process.nextTick.DB_HOST);

const pool = new Pool(dbConfig);

function waterfall(res){
  this.run = (cbs, errCb) => {
    async.waterfall([
      cb => {
        pool.connect()
        .then(client => { 
          this.client = client;
          client.query('BEGIN;');
          cb(); 
        });
      },
      ...cbs
    ],
    (err) => {
      if(err){
        console.error(err);
        errCb && errCb(err);
        this.client.query('ROLLBACK;');
        res && res.error();
      }
      else this.client.query('COMMIT;');

      this.client.release();
    }
    );
  }
}




module.exports = { pool, waterfall };