const columns = `
  user_id                 UUID            NOT NULL,
  token                   CHARACTER(16)   NOT NULL,
  update_time             CHARACTER(25)   NOT NULL        
`;

module.exports = { columns };