export const MODAL_STATE = 'MODAL_STATE'

export const modalState = (modalState, id) => ({
  type: MODAL_STATE,
  modalState,
  id
});
