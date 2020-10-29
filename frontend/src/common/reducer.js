export const INITIAL_STATE = {
  user: null,
  posts: [],
  loading: false,
  species: 1
};

export const actionNames = {
  login: 'USER/LOGIN',
  logout: 'USER/LOGOUT',
  initPost: 'POST/INIT',
  addPost: 'POST/ADD',
  modifyPost: 'POST/MODIFY',
  loadOn: 'LOADING/ON',
  loadOff: 'LOADING/OFF'
}

export function reducer(state, action){
  switch(action.type){
    case actionNames.login:
      return{
        ...state, user: action.user
      };
    case actionNames.logout:
      return{
        ...state, user: null
      };
    case actionNames.initPost:
      return{
        ...state, posts: action.posts
      };
      case actionNames.addPost:
      return{
        ...state, posts: [ ...state.posts, ...action.posts ]
      };
    case actionNames.modifyPost:
      const clonePosts = [ ...state.posts ];
      clonePosts[action.index] = action.post;
      return{
        ...state, posts: clonePosts
      };
    case actionNames.loadOn:
      return{
        ...state, loading: true
      };
    case actionNames.loadOff:
      return{
        ...state, loading: false
      };
    default:
      return state;
  }
}