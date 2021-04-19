import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { getAllPosts, upVoteToPost, downVoteToPost, getPostsByCategory } from '../utils/api'
import { getPosts, modalState, upVote, downVote, upVoted, downVoted, getId } from '../actions'
import Divider from '@material-ui/core/Divider';

import { BsShift } from "react-icons/bs";
import { BsShiftFill } from "react-icons/bs";

import { BsChat } from "react-icons/bs";

import {useSelector, useDispatch} from 'react-redux'
import EditPost from './EditPost'
import Comments from './Comments'
import VotePost from './VotePost'
import { deletePost } from '../utils/api'
import NoPostFound from './NoPostFound'
import EmptyIcons from '../icons/emptyIcon.svg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  /*root: {
    display: 'flex',

  },*/
  root: {
    width: '100%',
    maxWidth: '96ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  block: {
    display: 'block',
    fontWeight: 'bold',

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
    margin:0

  },
  center: {
    postion: 'absolute',
    top: '50%',
    left: '50%',
    margin: '150px 0 0 400px',
    zIndex: 15,
  }
}));

/* EmptyIcon icon */
function EmptyIcon(props) {
  return (
    <svg height="100pt" viewBox="0 -12 512.00032 512" width="100pt" xmlns="http://www.w3.org/2000/svg"><path d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"/><path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0"/><path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"/>
</svg>
  );
}

export default function Posts() {
  /* Reference to dispatch function */
  const dispatch = useDispatch()


  const foodie = useSelector(state => state.postsReducer);
  const votedState = useSelector(state => state.voteReducer)
  const categorySelected = useSelector(state =>state.postsReducer.category)
  const modea = useSelector(state => state.modalReducer.modalState)

  const [postCat, setPostCat] = React.useState([])
  /* Async method to get post from API */
  const getElements = async () => {
    //console.log(categorySelected)
    if (categorySelected===undefined) {
      const elems = await getAllPosts();
      setPostCat(await getAllPosts());
      return elems;
    } else {
      const elems = await getPostsByCategory(categorySelected);
      setPostCat(await getPostsByCategory(categorySelected))
      //setAllposts(elems)
      console.log(elems);
      // dispatch getPosts action
      //dispatch(getPosts(await getAllPosts()))
      return elems;
    }

 };
 useEffect(() => {
   // getElements method call
   getElements()
 },[])


  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState(false);
  /* called if modal is closed */
  const handleClose = () => {
    setOpen(false);
  };

  /*  */
  const openModal = (e,id) => {
    // dispatch action to set modal state open and id of the post clicked
    dispatch(modalState({open:true,id:id}))
    //console.log(id)

  }

  // state containing id of clicked posts
  const [clickedPostedId, setClickedPostId] = React.useState('');
  const setId = (id) => {
    setClickedPostId(id)

  }

  // reload window
  const reload=()=>window.location.reload();
  // Delete post
  const deletePosts = (id) => {
    deletePost(id)
    // refresh window
    reload()
  }

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

  // Comment Section expanded State
  const [expanded, setExpanded] = React.useState(false);

  // Set state for comment sections
  const handleExpandClick = (id) => {
    setExpanded(!expanded);
  };

  const [date, setDate] = React.useState((new Date).toString())
  const convertUnixToDate = (time) => {
    var dates = new Date(time)
    return dates.toString();
  }

  const getid = (e,id) => {
    console.log(id);
  }

    return (
      /*<div >
        {postCat.length !== 0 ?  postCat.map((postings,i) => (
        <li  className={classes.lists} key={i} >
          <Card className={classes.cardRoot}  >
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
              subheader={convertUnixToDate(postings.timestamp)}
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
        </li>
        )) : <NoPostFound/>}
        {modea.open ===true &&(
        <div>
          {<EditPost
            clickedPostId={clickedPostedId}/>}
        </div>
      )}
      </div>*/
      <div>
        {postCat.length !== 0 ?  postCat.map((postings,i) => (
        <List className={classes.root}>
        <Card className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>

            <ListItemText
              primary={postings.author}
              secondary={convertUnixToDate(postings.timestamp)}
            />

            <div>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}>
                  <MenuItem onClick={
                    (e) => { handleClose();
                      openModal(e,postings.id);
                      handleMenuClose();
                      setId(postings.id)}
                  }> Edit Post
                  </MenuItem>
                  <MenuItem onClick= {
                    () => {
                      handleClose();
                      deletePosts(postings.id);
                      handleMenuClose()}
                  }>
                    Delete Post
                  </MenuItem>
              </Menu>
            </div>
          </ListItem>
          <ListItem  alignItems="flex-start">
            <div>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.block}
                color="textPrimary"
              >
                {postings.title}
              </Typography>

              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {postings.body}
              </Typography>

              <VotePost posters={postings}
              Voteid={postings.is}/>
            </div>
          </ListItem>
          <Divider  component="li" />
        {<Comments
          expanded={expanded}
          />}
          </Card>
        </List>

        )) : <NoPostFound/>}
        {modea.open ===true &&(
          <EditPost clickedPostId={clickedPostedId} />
        )}
      </div>
  )
}
