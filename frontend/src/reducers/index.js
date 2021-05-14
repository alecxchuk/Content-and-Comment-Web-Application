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
import voteCommentReducer from './voteCommentReducer';
import commentReducer from './commentReducer';
import newPostReducer from './newPostReducer';

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




export default combineReducers ({
  postsReducer,
  modalReducer,
  voteReducer,
  voteCommentReducer,
  commentReducer,
  newPostReducer,
})
