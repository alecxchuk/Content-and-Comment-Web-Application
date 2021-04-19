import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import { getAllPosts, upVoteToPost, downVoteToPost } from '../utils/api'
import { getPosts, modalState, upVote, downVote, upVoted, downVoted, getId } from '../actions'
import Divider from '@material-ui/core/Divider';

import { BsShift } from "react-icons/bs";
import { BsShiftFill } from "react-icons/bs";

import { BsChat } from "react-icons/bs";

import {useSelector, useDispatch} from 'react-redux'
import EditPost from './EditPost'
import Comments from './Comments'
import { deletePost } from '../utils/api'
import Posts from './Posts'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  cardRoot: {
    marginBottom:'12px',
    marginLeft: '48px',
    width: '70%',
  },
  rotate: {
    transform: 'rotate(180deg)',


  },
  button: {
    //margin: theme.spacing(1),


    width: '0px',

  },
  comments: {
    textAlign: 'center',
    textAlignLast: 'right',
  },
  coloredButton: {
    backgroundColor:'black'
  },
  lists:{
    listStyle:'none',

  }
}));




export default function Home(){

  const classes = useStyles();

  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState(false);

  /* called if modal is open */
  const handleOpen = () => {
    setOpen(true);
  };
  /* called if modal is closed */
  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* State for posts */
  const [allPosts, setAllposts] = React.useState([])

  /* Reference to dispatch function */
  const dispatch = useDispatch()


  const foodie = useSelector(state => state.postsReducer);
  const modea = useSelector(state => state.modalReducer.modalState)
  const votedState = useSelector(state => state.voteReducer)


  /* Async method to get post from API */
  const getElements = async () => {
    const elems = await getAllPosts();

    setAllposts(elems)
    //console.log(allPosts)
    // dispatch getPosts action
    dispatch(getPosts(await getAllPosts()))

    return elems;
 };
 // reload window
 const reload=()=>window.location.reload();
 // Delete post
 const deletePosts = (id) => {
   deletePost(id)
   // refresh window
   reload()
 }

  /*  */
  const openModal = (e,id) => {
    // dispatch action to set modal state open and id of the post clicked
    dispatch(modalState({open:true,id:id}))
    //console.log(id)

  }

  useEffect(() => {
    // getElements method call
    getElements()
  },[])

  const getAll = () => {
    //console.log(foodie)
    /* dispatch action to store posts in store */
    dispatch(getPosts({allPosts}))
  }
//console.log(allPosts)
// console.log(foodie)
const [upIcon, setUpIcon]= React.useState(BsShift);
const [downIcon, setDownIcon] = React.useState(BsShift);
  /* upVote or downVote a post */
  const upVotePost = (id) => {
    //dispatch(getId({id}))

    if (votedState.upVoted === false ) {
      console.log('if')

      // Call Api to upVote the post
      upVoteToPost(id);

      // dispatch upVote action (increase count by 1)
      dispatch(upVote({id}));
      //console.log(foodie)
      // set upVotedState to true
      dispatch(upVoted(true,id));



      // Change icon to Filled icon
      setUpIcon(BsShiftFill);
      setDownIcon(BsShift);

      // set downVotedState to false
      //dispatch(downVoted(false,id));

    } else {
      console.log('else')
      downVoteToPost(id)

      // dispatch upVote action
      dispatch(downVote({id}))
      // set upVotedState to false
      dispatch(upVoted(false,id));

      setUpIcon(BsShift);
    }


  }

  const downVotePost = async (id) => {
    if (votedState.downVoted === false) {
      downVoteToPost(id);

      setDownIcon(BsShiftFill)
      setUpIcon(BsShift)

      // dispatch upVote action
      dispatch(downVote({id}))



      // set upVotedState to true
      dispatch(downVoted(true,id));
      // set downVotedState to true
      //dispatch(downVoted({downVoted:true, id}))
      // set upVotedState to false
      //dispatch(upVoted(false,id))

    } else {
      console.log('else')
      // upVote Post
      upVoteToPost(id)

      // dispatch upVote action
      dispatch(upVote({id}))
      // set downVotedState to false
      dispatch(downVoted(false,id))

      setDownIcon(BsShift);

    }
  }

  //let postee = foodie.post.elems

  // Comment Section expanded State
  const [expanded, setExpanded] = React.useState(false);

  // state containing id of clicked posts
  const [clickedPostedId, setClickedPostId] = React.useState('');
  //console.log(clickedPostedId)
  const setId = (id) => {
    setClickedPostId(id)
    //console.log(id)
  }

  // Set state for comment section
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    /*<div>
        <li className={classes.lists} >
          <div>
            {foodie.post.map((postings,i) => (
          <Card className={classes.cardRoot} key={i}>
            <CardHeader
              action={
                <div>
                  <IconButton aria-label="settings" onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={
                      (e) => {handleClose(); openModal(e,postings.id); handleMenuClose(); setId(postings.id)}
                    }>
                      Edit Post
                    </MenuItem>
                    <MenuItem onClick= {
                      () => {handleClose(); deletePosts(postings.id); handleMenuClose()}
                    }>
                      Delete Post
                    </MenuItem>
                  </Menu>
                </div>
              }
              title=<Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              badgeContent={postings.category} color="primary">{postings.author}</Badge>
              subheader={`September 14, 2016 ${postings.id}`}
              />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {postings.title}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p" >
                {postings.body}
              </Typography>
            </CardContent>
            <CardActions >
              <Button
                className={classes.button}
                startIcon={upIcon}
                onClick = {() => upVotePost(postings.id)}
              >
                {postings.voteScore}
              </Button>

              <Divider orientation="vertical" flexItem/>
              <Button
                className={classes.button}
                startIcon={downIcon} className={classes.rotate}
                onClick={() => downVotePost(postings.id)}
              >
              </Button>

              <Button
                className={classes.button}
                startIcon={<BsChat />}
                onClick ={handleExpandClick}
              >
                {postings.commentCount}
              </Button>
            </CardActions>
            {<Comments
              expanded={expanded}
              />}
          </Card>
          ))}
          </div>

        </li>

        {modea.open ===true &&(
          <div>
            {<EditPost
              clickedPostId={clickedPostedId}/>}
          </div>
        )}
    </div>*/
    <Posts />
  )

}
