import {
  UP_VOTED,
  DOWN_VOTED,
  GET_ID,
} from '../constants/vote'

const intialState = {
    upVoted: false,
    id: null,
    downVoted: false,


}

const voteReducer = (state = intialState, action) => {
  switch (action.type) {
    case UP_VOTED: {
      const { upVotedState, id } = action;
        return {
          ...state,
          upVoted:upVotedState,
          //downVoted:false,
          id: id

        }
    }

    case DOWN_VOTED:{
      const { downVotedState, id } = action;
        return {
          ...state,
          downVoted:downVotedState,
          //upVote:false,
          id: id

        }
      }
    case GET_ID:
      const { id } = action;
        return {
          ...state,
          id:id.id

        }

    default:
    return state;
  }
}
export default voteReducer;
