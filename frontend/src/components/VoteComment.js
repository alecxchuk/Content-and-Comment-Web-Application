import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { BsShift } from "react-icons/bs";
import { BsShiftFill } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { getPosts, modalState, upVote, downVote, upVoted, downVoted, getId } from '../actions'
import { getAllPosts, upVoteToPost, downVoteToPost } from '../utils/api'
import Comments from './Comments'

import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  /*root: {
    display: 'flex',

  },*/
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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

export default function VotePost() {
  /* Reference to dispatch function */
  const dispatch = useDispatch();
  const classes = useStyles();

  const [upIcon, setUpIcon]= React.useState(BsShift);
  const [downIcon, setDownIcon] = React.useState(BsShift)
  // store
  const votedState = useSelector(state => state.voteReducer)
  /* upVote or downVote a post */
  const upVotePost = (id) => {
    //dispatch(getId({id}))
    if (votedState.upVoted === false ) {
      // Call Api to upVote the post
      upVoteToPost(id);
      // dispatch upVote action (increase count by 1)
      dispatch(upVote({id}));

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
  // Set if comment section is expanded or not
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Comment Section expanded State
  const [expanded, setExpanded] = React.useState(false);


  const [date, setDate] = React.useState((new Date).toString())
  const convertUnixToDate = (time) => {
    var dates = new Date(time)
    return dates.toString();
  }
  return (
    <div>
    <CardActions >
      <Button
        className={classes.button}
        startIcon={upIcon}

      >

      </Button>

      <Divider orientation="vertical" flexItem/>
      <Button
        className={classes.button}
        startIcon={downIcon} className={classes.rotate}

      >
      </Button>

    </CardActions>
    </div>
  )
}
