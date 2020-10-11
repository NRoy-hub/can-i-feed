import axios from 'axios';

export const api = {
  KEYWORDS: '/keywords',
  SPEAK_OUT: '/speak_out',
  SEARCH: '/search',
  CHECK_EMAIL: '/check_email',
  LOGIN: '/login',
  ENROLL: '/enroll',
  LOGOUT: '/logout'
};


export const requestApi = async({ method = 'GET', path, data = {}, success, fail, common }) => {
  const { data: res } = await axios.post(path, data);
  console.log(res);
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