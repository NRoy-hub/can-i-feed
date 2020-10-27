import styled from 'styled-components';
import { color } from 'common';

export default styled.div`
  margin-top: 55px;
  display: flex; align-items: center;
  color: ${ color.black1 };
  font-size: 25px;

  input[type=text]{ 
    width: 200px;
    margin: 0 13px;
    padding: 4px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-size: 20px;
  }
`;