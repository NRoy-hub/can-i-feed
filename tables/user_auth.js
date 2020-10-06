const columns = `
  user_id                 UUID            NOT NULL,
  key                     CHARACTER(5)    NOT NULL,
  update_time             CHARACTER(25)   NOT NULL        
`;

module.exports = { columns };