import {
  NEW_POST_ADDED
} from '../constants/newPost'

const intialState = {
    newPost: false,
}

const newPostReducer = (state = intialState, action) => {
  switch (action.type) {
    case NEW_POST_ADDED:
      const { postAdded } = action;
        return {
          ...state,
          newPost:postAdded,
          }
    default:
    return state;
  }
}
    export default newPostReducer;
