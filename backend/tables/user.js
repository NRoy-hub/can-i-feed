const columns = `
  id          UUID        DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL
`;

const primaryKey = ['id'];
const unique = ['email'];

module.exports = { columns, primaryKey, unique };