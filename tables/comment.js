const columns = `
  post_id           UUID        NOT NULL,
  user_id           UUID        NOT NULL,
  type              SMALLINT    NOT NULL,
  text              TEXT
`;

module.exports = { columns };