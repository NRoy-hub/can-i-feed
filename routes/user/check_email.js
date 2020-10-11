const smtp = require('../../smtp');
const rand = require('random-key');

module.exports = (req, res) => {
  const { email } = req.body;
  if(!email){ return res.finish('invalid'); }

  const db = new res.db();
  
  const code = rand.generateBase30(5);

  db.run([
    cb => {
      smtp.sendMail({
        from: `"CanIFeed Team" <${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: '[Can I Feed] 로그인 인증코드',
        html: `인증번호는 <b>${ code }</b> 입니다. <br />1시간 이내에 인증하지 않을 경우 재요청해야 합니다.`
      }, (err) => {
        if(err)return cb('invalid');
        cb();
      })
    },
    cb => {
      const query = `
        INSERT INTO user_auth(email, key, update_time)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE
          SET key = $2,
              update_time = $3;
      `;
      const values = [email, code, res.now()];
      db.query(query, values, err => {
        if(err)return cb(err);
        res.finish('ok');
        cb();
      });
    }
  ])
}