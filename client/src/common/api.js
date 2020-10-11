import axios from 'axios';

export const api = {
  KEYWORDS: '/keywords',
  SEARCH: '/search',
  USER_INFO: '/user/info',
  USER_CHECK_EMAIL: '/user/check_email',
  USER_LOGIN: '/user/login',
  USER_LOGOUT: '/user/logout',
  POST_ENROLL: '/post/enroll',
  POST_SPEAK_OUT: '/speak_out'
};


export const requestApi = async({ path, data = {}, success, fail, common }) => {
  const { data: res } = await axios.post(path, data);
  console.log(`
    PATH: ${ path },
    res: ${ res.result }
  `);
  console.log(res.data);
  console.log('--------------------');
  if(res.result === 'ok'){
    success && success(res.data);
  }else{
    let msg;
    switch(res.result){
      case 'invalid': msg = '잘못된 요청입니다'; break;
      case 'error': msg = '오류가 발생했습니다'; break;
      case 'unauthorized': msg = '권한이 없습니다'; break; 
    }
    alert(msg);
    fail && fail();
  }
  common && common();

}