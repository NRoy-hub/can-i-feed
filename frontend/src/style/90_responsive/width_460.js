import { css, keyframes } from 'styled-components';

export default css`
  @media screen and (max-width: 460px){
    .top_bar{
      padding: 5px 6px;
      font-size: 0.875em;
    }
    .home {
      .cover{
        width: 80vw;
        height: auto;
      }
      .search_bar input[type=text]{
        width: 120px;
        margin: 0 6px;
      }
      .keyword_board .tabs{
        font-size: 0.875em;
        gap: 7px;
      }
    }
    .mypage_container{
      width: 300px;
      .account_setting{
        .email{
          padding-left: 10px;
        }
        .delete_user{
          margin-right: 5px;
        }
      }
    }
    .search{
      .post{
        width: 95vw;
        height: 90vw;

        &.open{
          padding-top: 90vw;
        }

        .photo{
          width: 95vw;
          height: 90vw;
        }
      }
    }
  }
`;

