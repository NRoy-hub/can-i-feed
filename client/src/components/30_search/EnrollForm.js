import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FormData from 'form-data';
import fs from 'fs';

import { api, url, color, requestApi, DataContext } from '../../common';

export default function EnrollForm(){
  const history = useHistory();
  const { keyword } = useParams();
  const photoInput = useRef();
  const label = useRef();
  const { dispatch, state: { species, user } } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const reader = useRef(new FileReader());

  function onSubmit(e){
    e.preventDefault();
    const file = photoInput.current.files[0];
    if(!file){ return alert('이미지를 업로드해주세요'); }

    dispatch.loadOn();
    const form = new FormData();
    form.append('photo', file);
    form.append('name', keyword);
    form.append('species', species);
    
    requestApi({
      path: api.POST_ENROLL,
      form,
      success: () => { 
        alert(`'${ keyword }' 먹이를 등록하였습니다.`);
        window.location.reload();
      },
      fail: msg => {
        if(msg === 'conflict'){
          alert('동일한 이름의 포스트가 존재합니다');
          window.location.reload();
        }
      },
      common: dispatch.loadOff
    }) 
  }

  function onClick(){
    if(!user)return history.push(url.LOGIN);
    setShowForm(!showForm);
  }
  
  function onChange(){
    const file = photoInput.current.files[0];
    if(file){ reader.current.readAsDataURL(file); }
    else{
      label.current.style.background = '';
    }
  }
  
  useEffect(() => {
    const onLoad = () => {
      label.current.style.background = `url(${ reader.current.result })`;
      label.current.style.backgroundSize = 'cover';
    };
    reader.current.addEventListener('loadend', onLoad, true);
    return () => reader.current.removeEventListener('change', onLoad);
  }, [reader]);

  return(
    <StyledAside>
      <div className="enroll_button">
        <span onClick={ onClick }>{ showForm ? '등록 취소하기' : `'${ keyword }' 등록하기` }</span>
      </div>
      {
        showForm &&
          <form action="" className="enroll_form" onSubmit={ onSubmit }>
            <div className="photo_box">
              <input ref={ photoInput } id="photo" type="file" accept="image/*" onChange={ onChange } />
              <label ref={ label } htmlFor="photo">
                <span>IMAGE</span>
              </label>
            </div>
            <div className="info">
              <div className="title">{ keyword }</div>
              <div className="status">
                <div>좋아요 0</div>
                <div>싫어요 0</div>
              </div>
              <p className="desc">!! 적합한 이미지를 업로드 해주세요. (업로드 필수)</p>
              <p className="desc">!! 부적합한 이미지라고 판단될 시 운영측에서 이미지를 변경할 수 있습니다.</p>
              <input type="submit" value="등록하기"/>
            </div>
          </form>
      }
    </StyledAside>
  );
}

const StyledAside = styled.aside`
    .enroll_button{
    padding-top: 30px;
    text-align: center;

    & span{
      text-decoration: underline;
      &:hover{
        cursor: pointer;
      }
    }
  }

  .enroll_form{
    margin-top: 30px;
    border: 2px solid ${ color.blue1 };
    padding: 24px;
    display: flex;
  }

  .photo_box{
    position: relative;

    input[type=file]{
      position: absolute;
      opacity: 0;
    }
    label{
      width: 295px;
      height: 295px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #EFEFEF;
      background-size: cover;
      color: #AAAAAA;
      font-size: 25px;

      &:hover{
        cursor: pointer;
      }
    }
  }

  .info{
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    font-size: 16px;

    .title{
      font-size: 32px;
    }
    .status{
      margin-top: 30px;
      display: flex;
      font-size: 24px;
      color: white;

      & > *{
        background: ${ color.grey };
        padding: 9px 13px;
      }
      & > *:hover{
        cursor: pointer;
      }
      & > *:last-child{
        margin-left: 20px;
      }
    }
    .desc{ margin-top: 15px; }
    .desc:first-of-type{ margin-top: 37px; }
    input[type=submit]{
      width: 148px;
      margin-top: 43px;
      padding: 10px 30px;
      background: ${ color.blue1 };
      border: none;
      outline: none;
      font-size: 22px;
      font-weight: bold;
      color: white;

      &:hover{
        cursor: pointer;
      }
    }
  }
`;