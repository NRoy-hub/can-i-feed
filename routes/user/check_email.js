const smtp = require('../../smtp');
const rand = require('random-key');

module.exports = (req, res) => {
  const { email } = req.body;

  if(!email){ return res.finish('invalid'); }

  const db = require('../../db');
  const waterfall = new db.waterfall(res);
  
  const code = rand.generateBase30(5);

  waterfall.run([
    cb => {
      smtp.sendMail({
        from: `"CanIFeed Team" <${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: '[Can I Feed] 로그인 인증코드',
        html: `인증번호는 <b>${ code }</b> 입니다. <br />1시간 이내에 인증하지 않을 경우 재요청해야 합니다.`
      }, (err) => {
        cb(err && '이메일을 전송할 수 없습니다');
      })
    },
    cb => {
      const query = 'SELECT id FROM "user" WHERE email = $1;';
      const values = [email];

      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        const user = result.rows[0];
        cb(null, (user && user.id) || null);
      });
    },
    (userId, cb) => {
      if(userId){ return cb(null, userId); }

      const query = 'INSERT INTO "user"(email) VALUES ($1) RETURNING id;';
      const values = [email];
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0].id);
      });
    },
    (userId, cb) => {
      const query = `
        INSERT INTO user_auth(user_id, key, update_time)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id) DO UPDATE
          SET key = $2,
              update_time = $3;
      `;
      const values = [userId, code, res.now()];
      waterfall.client.query(query, values, err => {
        if(err)return cb(err);
        res.finish('ok', { user_id: userId });
        cb();
      });
    }
  ])
}