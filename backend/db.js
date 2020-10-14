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
    (result) => {
      if(result){
        this.query('ROLLBACK;');
        if(typeof result === 'string'){
          this.finish && this.finish(result)
        }else{
          console.error(result);
          this.finish && this.finish('error');
        }
      }
      else this.query('COMMIT;');

      this.release();
      callback && callback(err);
    }
    );
  }
}




module.exports = Postgres;