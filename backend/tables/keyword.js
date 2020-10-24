const columns = `
  name          TEXT,
  species       SMALLINT,     
  count         INT               DEFAULT 1,
  update_time   CHARACTER(25)     NOT NULL
`;

const primaryKey = ['name', 'species'];

module.exports = { columns, primaryKey };