const columns = `
  id          SMALLSERIAL,
  name        TEXT          NOT NULL
`;

const primaryKey = ['id'];
const init = `(name) VALUES('dog'),('cat')`;

module.exports = { columns, primaryKey, init };