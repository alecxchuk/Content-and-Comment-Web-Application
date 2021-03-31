import {
  ADD_POST,
  DELETE_POST,
  UP_VOTE_COUNT,
  DOWN_VOTE_COUNT,
  EDIT_POST,
  COMMENT_COUNTER,
  GET_POSTS_BY_CATEGORY,
  GET_ALL_POSTS,

} from '../constants/posts'

const intialState = {
  post:[]

}

const postsReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:{
      const { post } = action;
        return {
          post
        }}

    case ADD_POST :
      const { post } = action;
      const newPost = state.post.push(post);
      console.log(state.post)
        return {
          ...state,
          /*[post]: {
            ...state[post],*/
            post: newPost,
          //}
        };
        case UP_VOTE_COUNT:
    			return {
    				...state,
    				post: state.post.map((post) => {
    					if( action.id === post.id ) {
    						return {...post, voteScore: ++post.voteScore}
    					}
    					return post
    				})
			}
        case DOWN_VOTE_COUNT:
        return {
          ...state,
          post: state.post.map((post) => {
            if( action.id === post.id ) {
              return {...post, voteScore: --post.voteScore}
            }

            return post
          })
        }

    case GET_POSTS_BY_CATEGORY:
      const { category, posts } = action;
       return {
         ...state,
         [category]: posts
       };


    /*case DELETE_POST:{
      const { id, category } = action.post;
      const newPost = state[post.category].filter(post => post.id !== id);
        return {
          ...state,
          [post.category]: newPost
        };
      };*/
    case EDIT_POST:
    case COMMENT_COUNTER:

    /*case ADD_POST:
      const { post } = action;
      const newPost = state[post.category].push(post);
        return {
          ...state,
          [post.category]: newPost
        }*/


      case DELETE_POST :{
        const { id } = action;
        return {
          ...state,
            [post.id]:null,
        };
}
    default:
    return state;
  }
}
export default postsReducer;
