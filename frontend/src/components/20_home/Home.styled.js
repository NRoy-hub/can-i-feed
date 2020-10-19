import styled from 'styled-components';
import { color } from '../../common';

export default styled.main`
  width: 100%;
  margin-top: 20px;
  font-size: 16px;

  .category{
    box-sizing: border-box;
    background: ${ color.grey };
    padding: 12px 40px;
    font-size: 23px;
    color: white;
  }

  .table{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }

  section{
    width: 33%;
    margin-bottom: 55px;
  }

  .head{
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
  }

  ul{
    list-style-type: square;
  }
  ol{
    list-style-type: decimal;
  }

  .keywords{
    margin-top: 13px;
    padding-left: 30px;
    color: ${ color.blue1 };

    & > li:not(:first-child){
      margin-top: 10px;
    }
  }

  .desc{
    margin-top: 15px;
    line-height: 30px;
  }
  .notice{
    margin-top: 41px;
    font-weight: bold;
  }

  @media screen and (max-width: 1090px){
    .category{
      padding-left: 30px;
    }
    .table{
      display: flex;
      padding-left: 60px;
      padding-right: 40px;
      & > section{
        width: 50%;
      }
      & > .precautions{
        width: 100%;
        order: 1;
      }
    }
  }

  @media screen and (max-width: 720px){
    margin-top: 15px;
    .category{
      height: 41px;
      padding-left: 20px;
      font-size: 16px;
    }
    .table{
      position: relative;
      flex-direction: column;
      padding-left: 23px;
      padding-right: 10px;

      & > section{
        width: 100%;
        overflow: hidden;
      }
    }
    .keywords{
      display: flex;
      justify-content: flex-start;

      & > li:not(:first-child){
        margin-top: 0;
        margin-left: 50px;
      }
    }
  }

`;