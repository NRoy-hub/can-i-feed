export const INITIAL_STATE = {
  user: null,
  searchInput: '',
  posts: [],
  loading: false
};

export const actionNames = {
  login: 'USER/LOGIN',
  logout: 'USER/LOGOUT',
  addPost: 'POST/ADD',
  modifyPost: 'POST/MODIFY',
  loadOn: 'LOADING/ON',
  loadOff: 'LOADING/OFF',
  setSearchInput: 'SET_SEARCH_INPUT',
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
    case actionNames.setSearchInput:
      return{
        ...state, searchInput: action.value
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