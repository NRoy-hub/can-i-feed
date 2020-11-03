const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const file = req.file;
  if(!file)return res.finish('invalid');
  
  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT photo_url FROM "user" WHERE id = $1;';
      const values = [req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('void');
        cb(null, result.rows[0].photo_url);
      })
    },
    (preUrl, cb) => {
      const query = 'UPDATE "user" SET photo_url = $1 WHERE id = $2;';
      const values = [res.photoUrl, req.user.id];
      db.query(query, values, (err) => {
        if(err)return cb(err);
        res.finish('ok', { photo_url: res.photoUrl });
        const prePath = preUrl && path.resolve(__dirname, '..', '..', preUrl.substr(1));
        prePath && fs.unlinkSync(prePath);
        cb();
      });
    }
  ]);
}