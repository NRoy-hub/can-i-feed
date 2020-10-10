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

const pool = new Pool(dbConfig);

function Postgres(){
  this.run = (cbs, callback) => {
    async.waterfall([
      cb => {
        pool.connect()
        .then(client => { 
          this.query = client.query.bind(client);
          this.release = client.release.bind(client);
          client.query('BEGIN;');
          cb(); 
        });
      },
      ...cbs
    ],
    (err) => {
      if(err){
        console.error(err);
        this.query('ROLLBACK;');
        const message = typeof err === 'string' && err;
        this.fail && this.fail(message);
      }
      else this.query('COMMIT;');

      this.release();
      callback && callback(err);
    }
    );
  }
}




module.exports = Postgres;