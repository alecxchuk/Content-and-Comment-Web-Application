import axios from 'axios';

const uri = process.env.API_ADDRESS || 'http://localhost:3001'
const API_TOKEN = process.env.API_TOKEN

const headers = {
  Accept: 'application/json',
  Authorization: API_TOKEN,
};

/* Get all of the posts for a particular category */
export async function getPostsByCategory(category) {
  const res = await axios.get(`${uri}/${category}/posts`, { headers });
  return res.data;
}

/* Get all of the posts. Useful for the main page when no category is selected. */
export async function getAllPosts() {
  try {
  const res = await axios.get(`${uri}/posts`, {headers})
  
  return res.data

  }
  catch (err) {
    console.log(err)

  }
}

/*export const getAllPosts = () =>
  fetch(`${uri}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.pending)*/

/* Get the details of a single post */
export async function getPostsByPostId(id) {
  const res = await axios.get(`${uri}/posts/${id}`, {headers})
  return res.data
}

/* Add a new post */
export async function addPost({ category, title, body, author }) {
  const id = makeid(22);
  const timestamp = Date.now();

  const res = await axios.post( `${uri}/posts`,
    {
      id,
      timestamp,
      title,
      body,
      author,
      category,
    },
    { headers }
  );
  return res.data;
}

/* Delete Post */
/* Sets the deleted flag for a post to 'true'. */
/* Sets the parentDeleted flag for all child comments to 'true'. */
export async function deletePost(id) {
  const res = await axios.delete(`${uri}/posts/${id}`, { headers });

  return res.data;
}

/* UpVote Post */
export async function upVoteToPost(id) {
    try {
  const res = await axios.post( `${uri}/posts/${id}`,
    { option: 'upVote', }, { headers }
  );
  return res.data;
}
catch (err) {
  console.log(err)

}
}

/* DownVote Post */
export async function downVoteToPost(id) {
  const res = await axios.post(`${uri}/posts/${id}`,
    { option: 'downVote', }, { headers }
  );
  return res.data;
}

/* Used for upVoting on a comment. */
export async function upVoteToComment(id) {
  const res = await axios.post( `${uri}/comments/${id}`,
    { option: 'upVote', }, { headers }
  );
  return res.data;
}

/* Used for down voting on a comment.t */
export async function downVoteToComment(id) {
  const res = await axios.post( `${uri}/comments/${id}`,
    { option: 'downVote',}, { headers }
  );
  return res.data;
}

/* Generate unique ids */
const makeid=(length) => {
var result = '';
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for (var i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

/* Edit the details of an existing post */
export async function editPostByPostId({ id, title, body }) {
  try {
  const res = await axios.put( `${uri}/posts/${id}`,
    {
      title,
      body,
    },
    { headers }
  );
  return res.data;
    console.log(res)
  } catch (err) {
    console.log(err)

  }



}


/* Get all Comments by PostId */
/* Get all the comments for a single post */
export async function getAllCommentsByPostId(id) {
  const res = await axios.get(`${uri}/posts/${id}/comments`, {
    headers,
  });

  return res.data;
}

/* delete Comment*/
/*   Sets a comment's deleted flag to 'true' */
export async function deleteComment(id) {
  const res = await axios.delete(`${uri}/comments/${id}`, { headers });

  return res.data;
}

/* Add a comment to a post */
export async function addComment({ body, author, parentId }) {
const id = makeid(22);
  const timestamp = Date.now();
  const res = await axios.post(
    `${uri}/comments`,
    {
      id,
      timestamp,
      body,
      author,
      parentId,
    },
    { headers }
  );

  return res.data;
}

/* Edit the details of an existing comment */
export async function editComment({ id, body }) {
  const timestamp = Date.now();
  const res = await axios.put( `${uri}/comments/${id}`,
    {
      body,
      timestamp,
    },
    { headers }
  );

  return res.data;
}
