import styled from 'styled-components';

export default styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  & img{
    width: 250px;
    height: 180px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26);
  }
`;