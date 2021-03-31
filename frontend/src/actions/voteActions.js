export const UP_VOTED = 'UP_VOTED'
export const DOWN_VOTED = 'DOWN_VOTED'
export const GET_ID = 'GET_ID'


export const upVoted = (upVotedState) => ({
  type: UP_VOTED,
  upVotedState,

});

export const downVoted = (downVotedState, id) => ({
  type: DOWN_VOTED,
  downVotedState,
  id
});

export const getId = (id) => ({
  type: GET_ID,
  id,

});
