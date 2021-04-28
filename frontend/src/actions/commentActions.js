export const ADD_COMMENT = 'ADD_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const DELETE_COMMENT_BY_PARENT = 'DELETE_COMMENT_BY_PARENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addComment ({ comment }) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

/*export function voteComment ({ id, upVote,downVote}) {
  return {
    type: VOTE_COMMENT,
    id,
    upVote,
    downVote,

  }
}*/
export function upVoteComment ({ id }) {
  return {
    type: UP_VOTE_COMMENT,
    id,
  }
}
export function downVoteComment ({ id }) {
  return {
    type: DOWN_VOTE_COMMENT,
    id,
  }
}

export function deleteCommentByParent ({ post}) {
  return {
    type: DELETE_COMMENT_BY_PARENT,
    post,

  }
}

export function deleteComment ({ id}) {
  return {
    type: DELETE_COMMENT,
    id,


  }
}

export function editComment ({ id, comment}) {
  return {
    type: EDIT_COMMENT,
    id,
    comment,

  }
}
