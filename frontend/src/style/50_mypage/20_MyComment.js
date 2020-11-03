import styled, { css } from 'styled-components';

export default styled.li`
  ${ ({ color }) => css`
    margin-bottom: 16px;
    padding: 10px 20px;
    background: #F8F9FB;

    .detail{
      display: flex;
      font-size: 14px;
      .like{ color: ${ color.blue }; }
      .dislike{ color: ${ color.red }; }
    }
    .content{
      margin-top: 8px;
      padding-left: 10px;
      color: #5A5A5A;
    }
    .time{
      margin-top: 7px;
      font-size: 14px;
      color: #A2A2A2;
    }
  `}
`;