const columns = `
  email         TEXT,
  ticket        UUID        UNIQUE        DEFAULT gen_random_uuid()
`;

const primaryKey = ['email'];
const unique = ['ticket'];

module.exports = { columns, primaryKey, unique };