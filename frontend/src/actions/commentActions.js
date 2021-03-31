export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT_BY_PARENT = 'DELETE_COMMENT_BY_PARENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addComment ({id, timestamp, body,author, parentId,/*,
                              voteScore,deleted,commentCount,*/}) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId,/*
    voteScore,
    deleted,
    commentCount,*/

  }
}

export function voteComment ({ id, upVote,downVote}) {
  return {
    type: VOTE_COMMENT,
    id,
    upVote,
    downVote,

  }
}

export function deletePostByParent ({ id, post,deleted,parentDeleted}) {
  return {
    type: DELETE_COMMENT_BY_PARENT,
    id,
    deleted,
    parentDeleted

  }
}

export function deleteComment ({ id, deleted}) {
  return {
    type: DELETE_COMMENT,
    id,
    deleted,

  }
}

export function editComment ({ id}) {
  return {
    type: EDIT_COMMENT,
    id,

  }
}
