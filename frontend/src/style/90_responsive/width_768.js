import { css } from 'styled-components';

export default css`
  @media screen and (max-width: 768px){
    font-size: 0.875em;
    .top_bar{
      padding: 6px 20px;
      flex-wrap: wrap;
      
      .search_bar{
        width: 100%;
        order: 2;
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;

        input{
          margin: 0 5px;
        }
      }
    }
    .home{
      .tabs{ gap: 10px; }
      .ranking{ margin-left: 0; }
      .keywords{ padding: 0 10px; }
    }
    .search{
      margin-top: 80px;

      .orders{
        padding: 30px 0 10px 0;
      }
    }
    .login_frame{
      width: inherit;
      padding: 30px 40px;
      margin: 0;

      input[type=text], .input_box{
        width: 250px;
      }
    }
  }
`;
