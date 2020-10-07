const columns = `
  user_id                 UUID,
  token                   CHARACTER(16)   NOT NULL,
  update_time             CHARACTER(25)   NOT NULL        
`;
const primaryKey = ['user_id'];

module.exports = { columns, primaryKey };