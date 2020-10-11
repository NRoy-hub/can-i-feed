const columns = `
  id                      UUID            DEFAULT gen_random_uuid(),
  user_id                 UUID            NOT NULL,
  species_id              SMALLINT        NOT NULL,
  photo                   TEXT            NOT NULL,
  name                    TEXT            NOT NULL,
  recommend_count         INTEGER         DEFAULT 0,
  nonrecommend_count      INTEGER         DEFAULT 0,
  update_time             CHARACTER(25)   NOT NULL
`;

const primaryKey = ['id'];

module.exports = { columns, primaryKey };