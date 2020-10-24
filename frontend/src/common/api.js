import axios from 'axios';

export const api = {
  KEYWORDS: '/keywords',
  SEARCH: '/search',
  USER_INFO: '/user/info',
  USER_CHECK_EMAIL: '/user/check_email',
  USER_LOGIN: '/user/login',
  USER_LOGOUT: '/user/logout',
  POST_ENROLL: '/post/enroll',
  POST_SPEAK_OUT: '/post/speak_out',
  POST_RECANT: '/post/recant'
};


export const requestApi = async({ path, data = {}, form, success, fail, common }) => {
  const { data: res } = await axios.post(path, form ? form : data);

  switch(res.result){
    case 'ok':
      success && success(res.data); break;
    case 'unauthorized':
      window.location.href = '/login';
      break;
    case 'invalid':
      alert('잘못된 요청입니다'); break;
    case 'error':
      alert('오류가 발생했습니다'); break;
    default:
      fail && fail(res.result);
  }
  common && common();
}