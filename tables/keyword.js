const columns = `
  name          TEXT              PRIMARY KEY,
  count         INT               DEFAULT 0,
  update_time   CHARACTER(25)     NOT NULL
`;

module.exports = { columns, noPrimaryKey: true };