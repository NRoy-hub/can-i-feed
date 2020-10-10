const columns = `
  user_id       UUID,
  ticket        UUID            DEFAULT gen_random_uuid(),
  update_time   CHARACTER(25)   NOT NULL 
`;

const primaryKey = ['user_id'];

module.exports = { columns, primaryKey };