import {
  UP_VOTED_COMMENT,
  DOWN_VOTED_COMMENT,
  GET_ID_COMMENT,
} from '../constants/voteComments'

const intialState = {
    upVoted: false,
    id: null,
    downVoted: false,
}

const voteCommentReducer = (state = intialState, action) => {
  switch (action.type) {
    case UP_VOTED_COMMENT: {
      const { upVotedState, id } = action;
        return {
          ...state,
          upVoted:upVotedState,
          //downVoted:false,
          id: id

        }
    }

    case DOWN_VOTED_COMMENT:{
      const { downVotedState, id } = action;
        return {
          ...state,
          downVoted:downVotedState,
          //upVote:false,
          id: id

        }
      }
    case GET_ID_COMMENT:
      const { id } = action;
        return {
          ...state,
          id:id.id

        }

    default:
    return state;
  }
}
export default voteCommentReducer;
