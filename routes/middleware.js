
const auth = (req, res, next) => {
  const { canifeed_uid } = req.cookies;
  const { canifeed_sid } = req.signedCookies;
  
  if(!canifeed_uid || canifeed_uid.length !== 36 || !canifeed_sid){
    res.clearCookie('canifeed_uid');
    res.clearCookie('canifeed_sid');
    return res.finish('unauthorized');
  };
  
  const db = new res.db();
  db.run([
    cb => {
      const query = `
      SELECT us.session_id, us.update_time FROM "user" u 
      JOIN user_session us 
      ON u.id = us.user_id
      WHERE u.id = $1;
      `;
      const values = [canifeed_uid];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (user, cb) => {
      const session_id = user && user.session_id;
      const update_time = user && user.update_time;
      if(!session_id || !update_time || canifeed_sid !== session_id || res.fromNow(update_time) > 60){
        res.clearCookie('canifeed_uid');
        res.clearCookie('canifeed_sid');
        return cb('unauthorized');
      }
      req.user = { id: canifeed_uid };
      cb();
      next();
    }
  ]);
}
const fileFilter = (req, file, cb) => {
  const rightMime = ['image/png', 'image/jpeg'].includes(file.mimetype);
  cb(null, rightMime);
}

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const resizing = (req, res, next) => {
  const { filename, path: originPath } = req.file;
  const resizedPath = path.resolve('uploads', filename);
  sharp(originPath, { background: { r: 255, g: 255, b: 255 } })
    .resize(295, 295)
    .jpeg({ quality: 50 })
    .toFile(resizedPath)
    .then(() => {
      fs.unlinkSync(originPath);
      next();
    })
    .catch(err => {
      if(err)res.finish('invalid');
    });
}

module.exports = { auth, fileFilter, resizing };