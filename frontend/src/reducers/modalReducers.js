import {
  MODAL_STATE,
} from '../constants/modals'

const intialState = {
  modalState: {
  open: false,
  id:null
}
}

const modalReducer = (state = intialState, action) => {
  switch (action.type) {
    case MODAL_STATE:
    const { modalState, id } = action;
      return {
        modalState,
        id
      }

    default:
    return state;
  }
}
export default modalReducer;
