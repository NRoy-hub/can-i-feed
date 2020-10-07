const columns = `
  user_id                 UUID,
  key                     CHARACTER(5)    NOT NULL,
  update_time             CHARACTER(25)   NOT NULL        
`;

const primaryKey = ['user_id'];

module.exports = { columns, primaryKey };