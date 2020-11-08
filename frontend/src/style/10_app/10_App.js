import styled from 'styled-components';
import { color } from 'common';
import { width_980, width_768, width_460 } from 'style/90_responsive';

export default styled.main`
  font-size: 1em;
  color: #2a2a2a;
  padding: 0;
  min-width: 320px;

  .disappear{ display: none; }
  .hidden{ visibility: hidden; }
  ${ width_980 }
  ${ width_768(color) }
  ${ width_460 }
`;