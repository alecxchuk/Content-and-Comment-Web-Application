import {
  ADD_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  DELETE_COMMENT_BY_PARENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../constants/comments'

const intialState = {
  comment:[]

}

const commentReducer = (state = intialState, action) => {
  switch (action.type) {

    case ADD_COMMENT :
      const { comment } = action;
      const newComment = state.comment.push(comment);
      //console.log(state.post)
        return {
          ...state,
          /*[post]: {
            ...state[post],*/
            comment: newComment,
          //}
        };
        case UP_VOTE_COMMENT:
    			return {
    				...state,
    				comment: state.comment.map((comment) => {
    					if( action.id === comment.id ) {
    						return {...comment, voteScore: ++comment.voteScore}
    					}
    					return comment;
    				})
			}
        case DOWN_VOTE_COMMENT:
        return {
          ...state,
          comment: state.comment.map((comment) => {
            if( action.id === comment.id ) {
              return {...comment, voteScore: --comment.voteScore}
            }
            return comment
          })
        }


    case DELETE_COMMENT_BY_PARENT:
    case EDIT_COMMENT:
      case DELETE_COMMENT :
    default:
    return state;
  }
}
export default commentReducer;
