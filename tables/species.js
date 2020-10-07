const columns = `
  id          SMALLSERIAL   PRIMARY KEY,
  name        TEXT          NOT NULL
`;

const init = `(name) VALUES('dog'),('cat')`;

module.exports = { columns, init, noPrimaryKey: true };