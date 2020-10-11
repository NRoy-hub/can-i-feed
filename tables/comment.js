const columns = `
  id                UUID            DEFAULT gen_random_uuid(),
  post_id           UUID            NOT NULL,
  user_id           UUID            NOT NULL,
  type              SMALLINT        NOT NULL,
  text              TEXT,
  update_time       CHARACTER(25)   NOT NULL
`;

const primaryKey = ['id'];
const unique = ['post_id', 'user_id'];

module.exports = { columns, primaryKey, unique };