const columns = `
  user_id                 UUID            NOT NULL,
  species_id              UUID            NOT NULL,
  photo                   TEXT            NOT NULL,
  title                   TEXT            NOT NULL,
  recommend_count         INTEGER         DEFAULT 0,
  nonrecommend_count      INTEGER         DEFAULT 0,
  update_time             CHARACTER(25)   NOT NULL
`;

module.exports = { columns };