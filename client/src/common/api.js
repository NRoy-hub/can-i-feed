export const api = {
  KEYWORDS: '/keywords',
  SPEAK_OUT: '/speak_out',
  SEARCH: '/search',
  CHECK_EMAIL: '/check_email',
  LOGIN: '/login',
  ENROLL: '/enroll',
  LOGOUT: '/logout'
};

export const requestApi = ({ method = 'GET', path, data = {}, success, fail, common }) => {
  let result = {};

  switch(path){
    case api.KEYWORDS:
      result = {
        keywords:{
          latest: tempKeywords,
          most: tempKeywords,
          recommend: tempKeywords,
          nonrecommend: tempKeywords
        }
      };
      break;

    case api.SPEAK_OUT:
      const { type } = data;
      if(type !== -1){
        result = { 
          my_comment: { id: 'comment_0', type: type, text: 'SUCEESS' } 
        };
      }
      break;

    case api.ENROLL: break;
    case api.LOGOUT: break;
    case api.CHECK_EMAIL: break;
    case api.LOGIN: break;

    default: // SEARCH
      result = { posts: [] };
      break;
  }
  success && success(result);
  common && common();

}

const tempKeywords = ['블루베리', '사과', '딸기', '한라봉', '닭가슴살'];
let index = 0;
const tempPosts = (length) => {
  let result = [];
  for(let i=0;i<length;i++){
    result.push({
      id: `post_id_${ i + index }`,
      photo: 'test.png',
      title: tempKeywords[i%5],
      recommend_count: 100,
      nonrecommend_count: 14,
      // my_comment: { id: 'comment_0', type: 1, text: '눈에 좋아요1' },
      comments: [ { id: 1, type: 1, text: '눈에 좋아요!' }, { id: 2, type: 0, text: '적당히 먹여요~' } ]
    });
    index += 1;
  }
  return result;
}