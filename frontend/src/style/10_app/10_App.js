import styled from 'styled-components';
import { width_980 } from 'style/90_responsive';

export default styled.main`
  font-size: 16px;
  color: #2a2a2a;
  padding: 0;
  min-width: 320px;

  .disappear{ display: none; }
  .hidden{ visibility: hidden; }
  ${ width_980 }
`;