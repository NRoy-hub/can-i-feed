module.exports = `
  photo                   TEXT        NOT NULL,
  title                   TEXT        NOT NULL,
  recommend_count         INTEGER     DEFAULT 0,
  nonrecommend_count      INTEGER     DEFAULT 0,
  updated_date            CHARACTER(25)        
`;