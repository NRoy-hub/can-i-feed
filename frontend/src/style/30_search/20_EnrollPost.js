import styled, { css } from 'styled-components';

export default styled.div`
  ${ ({ color }) => css`
    position: relative;
    margin-top: 10px;
    padding: 10px;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > span{ font-size: 15px; }
    .keyword{ text-decoration: underline; }
    .active_enroll_button{
      margin-left: 12px;
      padding: 4px 7px;
      background: ${ color.blue };
      border-radius: 5px;
      font-size: 14px;
      color: white;
      &:hover{ cursor: pointer; }
    }
    .enroll_form{
      position: absolute;
      top: 47px;
      left: calc(50% - 107px);
      width: 214px;
      padding-bottom: 12px;
      background: white;
      border: 1px solid #BBBBBB;
      border-radius: 5px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;

      .backdrop{
        position: absolute;
        top: 15px;
        left: 10px;
        width: 194px;
        height: 197px;
        opacity: 0.05;
      }
      .close_button{
        position: absolute;
        top: 4px;
        right: 6px;
        padding: 8px;
        z-index: 2;
        &:hover{ cursor: pointer; }
        img{
          width: 12px;
          height: 12px;
        }
      }
      .upload_container{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 30px;
        padding-bottom: 12px;
        input[type=file]{ display: none; }
        label{
          width: 100px;
          height: 87px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          &:hover{ cursor: pointer; }
        }
      }
      form{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        padding: 0 10px;
        flex-direction: column;
        align-items: center;
        z-index: 1;
      }
      .title{
        width: 100%;
        height: 18px;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 13px;
        font-weight: bold;
      }
      .desc{
        margin-top: 5px;
        color: #818181;
      }
      .enroll_button{
        margin-top: 12px;
        padding: 5px 10px;
        background: ${ color.grey3 };
        border-radius: 5px;
        font-size: 14px;
        color: white;
        &:hover{ cursor: pointer; }
        &.active{ background: #2A2A2A; }
      }
    }
  `}
`;