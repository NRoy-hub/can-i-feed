import styled, { css, keyframes } from 'styled-components';

const getDotKeyframes = scales => {
  const str = [0, 25, 50, 75, 100].reduce((pre, current, index) => {
    return pre + `${ current }%{
      transform: scale(${ scales[index % scales.length] });
    }`;
  }, '');

  console.log(str);
  return keyframes`${ str }`;
}


export default styled.div`
  ${ ({ color }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: rgba(255, 255, 255, 0.3); */

    .dots{
      display: flex;
      
      li{
        width: 15px;
        height: 15px;
        border-radius: 8px;
        background: ${ color.blue };
        opacity: 0.6;

        &.first_dot{ animation: ${ getDotKeyframes([1, 1.2, 1, 1]) } 1s linear infinite; }
        &.second_dot{ animation: ${ getDotKeyframes([1, 1, 1.2, 1]) } 1s linear infinite; }
        &.third_dot{ animation: ${ getDotKeyframes([1, 1, 1, 1.2]) } 1s linear infinite; }
      }
      li:not(:first-child){
        margin-left: 10px;
      }
    }
  `}
`;