import styled from 'styled-components';
import { color } from '../../common';


export default styled.div`
  height: 120px;  
  margin-top: 20px;
  background: ${ color.blue2 };
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: white;

  .inner_box{
    display: flex;
    align-items: flex-end;
  }

  input[type=text]{
    width: 350px;
    margin-left: 20px;
    margin-right: 5px;
    background: inherit;
    outline: none;
    border: none;
    border-bottom: 2px solid white;
    padding-bottom: 4px;
    transform: translateY(3px);
    text-align: center;
    font-size: 25px;
    color: white;
  }

  .option{
    margin-left: 25px;
    padding-bottom: 5px;
    opacity: 0.85;
    font-size: 20px;
  }

  @media screen and (max-width: 1090px){
    input[type=text]{
      width: 270px;
    }
  }
  @media screen and (max-width: 720px){
    height: 62px;
    margin-top: 10px;
    font-size: 24px;

    .inner_box{
      padding-bottom: 5px;
    }
    input[type=text]{
      width: 190px;
      font-size: 20px;
    }
    .option{
      font-size: 16px;
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 480px){
    font-size: 20px;

    input[type=text]{
      margin-left: 10px;
      width: 100px;
      font-size: 15px;
    }
    .option{
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;