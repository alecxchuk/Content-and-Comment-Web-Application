export const ADD_POST = 'ADD_POST'
export const UP_VOTE_COUNT = 'UP_VOTE_COUNT'
export const DOWN_VOTE_COUNT= 'DOWN_VOTE_COUNT'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const COMMENT_COUNTER = 'COMMENT_COUNTER'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_POST_ID = 'GET_POST_BY_POST_ID';
export const UPVOTE_POST = 'UPVOTE_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';



export const getPosts = post => ({
  type: GET_ALL_POSTS,
  post
});

export const getPostByPostId = id => ({
  type: GET_POST_BY_POST_ID,
  id
});


export const getPostsByCategory = category => ({
  type: GET_POSTS_BY_CATEGORY,
  category,
});

export function addNewPost ({post}) {
  return {
    type: ADD_POST,
    post

  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,


  }
}

/*export function editPostById ({ post }) {
  return {
    type: EDIT_POST,
    post,

  }
}*/
export const editPostById = post => ({
  type: EDIT_POST,
  post,
});

export function upVote ({ id }) {
  return {
    type: UP_VOTE_COUNT,
    id,
  }
}
export function downVote ({ id }) {
  return {
    type: DOWN_VOTE_COUNT,
    id,
  }
}



export function commentCounter ({ id, commentCount}) {
  return {
    type: COMMENT_COUNTER,
    id,
    commentCount,

  }
}
