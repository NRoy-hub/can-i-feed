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

function Postgres(){
  this.run = (cbs, callback) => {
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
        this.client.query('ROLLBACK;');
        const message = typeof err === 'string' && err;
        this.fail && this.fail(message);
      }
      else this.client.query('COMMIT;');

      this.client.release();
      callback && callback(err);
    }
    );
  }
}




module.exports = Postgres;