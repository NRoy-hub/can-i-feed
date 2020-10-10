const columns = `
  email                   TEXT,
  key                     CHARACTER(5)    NOT NULL,
  update_time             CHARACTER(25)   NOT NULL        
`;

const primaryKey = ['email'];

module.exports = { columns, primaryKey };