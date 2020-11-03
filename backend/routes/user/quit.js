const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const db = new res.db();

  db.run([
    cb => {
      const query = `
        INSERT INTO "user"(email) VALUES($1)
        ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email 
        RETURNING id;
      `;
      const values = ['master@canifeed.com'];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (master, cb) => {
      const query = 'UPDATE comment SET user_id = $1 WHERE user_id = $2;';
      const values = [master.id, req.user.id];
      db.query(query, values, (err) => {
        if(err)return cb(err);
        cb(null, master);
      });
    },
    (master, cb) => {
      const query = 'UPDATE post SET user_id = $1 WHERE user_id = $2;';
      const values = [master.id, req.user.id];
      db.query(query, values, (err) => cb(err));
    },
    cb => {
      const query = 'DELETE FROM user_session WHERE user_id = $1;';
      const values = [req.user.id];
      db.query(query, values, (err) => cb(err));
    },
    cb => {
      const query = 'DELETE FROM "user" WHERE id = $1 RETURNING photo_url;';
      const values = [req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0].photo_url);
      });
    },
    (photo_url, cb) => {
      try{
        const absPath = photo_url && path.resolve(__dirname, '..', '..', photo_url.substr(1));
        absPath && fs.unlinkSync(absPath);
        res.finish('ok');
        cb();
      }
      catch(err){ cb(err); }
    }
  ]);
}