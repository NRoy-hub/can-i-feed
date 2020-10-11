module.exports = (req, res) => {
  const { species, photo, name } = req.body;
  if(!species || !photo || !name){ return res.finish('invalid'); }

  //TODO: photo 가 이미지인지 검사
  
  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT * FROM post WHERE species_id = $1 AND name = $2;';
      const values = [species, name];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(result.rows.length > 0)return cb('conflict');
        cb();
      });
    },
    cb => {
      // TODO: photo url 생성
      const photoUrl = 'test_photo_url';
      const query = `
        INSERT INTO post(user_id, species_id, photo, name, update_time)
        VALUES($1, $2, $3, $4, $5); 
      `;
      const values = [req.user.id, species, photoUrl, name, res.now()];
      db.query(query, values, (err) => {
        if(err)return cb(err);
        res.finish('ok');
        cb();
      });
    }
  ]);
}