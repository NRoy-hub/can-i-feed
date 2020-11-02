
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
      if(!session_id || !update_time || canifeed_sid !== session_id || res.fromNow(update_time) > 60 * 60000){
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
const imageFilter = (req, file, cb) => {
  const rightMime = ['image/png', 'image/jpeg'].includes(file.mimetype);
  cb(null, rightMime);
}

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resizing = (width, height, foldername) => {
  return (req, res, next) => {
    const { filename, path: originPath } = req.file;
    if(!filename || !originPath)return res.finish('invalid');

    const resizedPath = path.resolve('uploads', foldername, filename);
    const folderPath = path.resolve('uploads', foldername);
    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
    res.photoUrl = `/uploads/${ foldername }/${ filename }`;

    sharp(originPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(width, height)
      .jpeg({ quality: 50, force: true })
      .toFile(resizedPath)
      .then(() => {
        fs.unlinkSync(originPath);
        next();
      })
      .catch(err => {
        if(err)res.finish('invalid');
      });
    }
}

module.exports = { auth, imageFilter, resizing };