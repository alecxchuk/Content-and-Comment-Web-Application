export const UP_VOTED_COMMENT = 'UP_VOTED_COMMENT'
export const DOWN_VOTED_COMMENT = 'DOWN_VOTED_COMMENT'
export const GET_ID_COMMENT = 'GET_ID_COMMENT'


export const upVotedComment = (upVotedState) => ({
  type: UP_VOTED_COMMENT,
  upVotedState,

});

export const downVotedComment = (downVotedState, id) => ({
  type: DOWN_VOTED_COMMENT,
  downVotedState,
  id
});

export const getIdComment = (id) => ({
  type: GET_ID_COMMENT,
  id,

});
