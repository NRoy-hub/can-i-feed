import styled, { css, keyframes } from 'styled-components';

const scaleSize = 1.3;
const timing = 0.8;

const getDotKeyframes = scales => {
  const str = [0, 25, 50, 75, 100].reduce((pre, current, index) => {
    return pre + `${ current }%{
      transform: scale(${ scales[index % scales.length] });
    }`;
  }, '');
  return keyframes`${ str }`;
}


export default styled.div`
  ${ ({ color }) => css`
    position: absolute;
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
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: ${ color.grey };
        opacity: 0.6;

        &.first_dot{ animation: ${ getDotKeyframes([1, scaleSize, 1, 1]) } ${ timing }s linear infinite; }
        &.second_dot{ animation: ${ getDotKeyframes([1, 1, scaleSize, 1]) } ${ timing }s linear infinite; }
        &.third_dot{ animation: ${ getDotKeyframes([1, 1, 1, scaleSize]) } ${ timing }s linear infinite; }
      }
      li:not(:first-child){
        margin-left: 10px;
      }
    }
  `}
`;