const columns = `
  id                UUID        DEFAULT gen_random_uuid(),
  post_id           UUID        NOT NULL,
  user_id           UUID        NOT NULL,
  type              SMALLINT    NOT NULL,
  text              TEXT
`;

const primaryKey = ['id'];

module.exports = { columns, primaryKey };