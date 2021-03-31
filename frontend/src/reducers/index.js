import {
  ADD_POST,
  DELETE_POST,
  UP_VOTE_COUNT,
  DOWN_VOTE_COUNT,
  EDIT_POST,
  COMMENT_COUNTER,
} from '../actions'
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT_BY_PARENT
} from '../actions/commentActions'
import { combineReducers } from 'redux';
import postsReducer from './postReducer';
import modalReducer from './modalReducers';
import voteReducer from './voteReducer';

const initialPost = {
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null,
    voteScore: null,
    deleted: null,
    commentCount: null
  }


/* Post Reducer */
//function post (state = {}, action) {
  /* Get properties from action */
  /*const { id, timestamp, title, body,author, category, voteScore,deleted,commentCount } = action
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          voteScore: 1,
          deleted: false,
          commentCount: 0

      }
    case UP_VOTE_COUNT:
      return {
        ...state,
        upVote: action.upVote,
        downVote: action.downVote,
      }
    case DELETE_POST:
    return {
      ...state,
      id: action.id,
      deleted: action.deleted
    }
    case EDIT_POST:
      return {
        ...state,

      }
    case COMMENT_COUNTER:
    return {
      ...state,
      id: action.id,
      count: action.count
    }
    default:
      return state
  }
}*/

/* Comment Reducer */
/*function comments (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:

      return {
        ...state,
        id: action.id,
        timestamp: action.timestamp,
        body: action.body,
        author: action.author,
        parentId: action.parentId,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      }


    case DELETE_COMMENT:

    case EDIT_COMMENT:

    case DELETE_COMMENT_BY_PARENT:
    case VOTE_COMMENT:
    default:
      return state

  }
}*/

export default combineReducers ({
  postsReducer,
  modalReducer, 
  voteReducer
})
