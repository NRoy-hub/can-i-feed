const columns = `
  name          TEXT,
  species       SMALLINT,     
  count         INT               DEFAULT 0,
  update_time   CHARACTER(25)     NOT NULL
`;

const primaryKey = ['name', 'species'];

module.exports = { columns, primaryKey };