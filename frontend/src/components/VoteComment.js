import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { BsShift } from "react-icons/bs";
import { BsShiftFill } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { getPosts, modalState, upVoteComment, downVoteComment, upVotedComment, downVotedComment, getIdComment } from '../actions'
import { getAllPosts, upVoteToComment, downVoteToComment } from '../utils/api'
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

export default function VoteComment({commentary}) {
  /* Reference to dispatch function */
  const dispatch = useDispatch();
  const classes = useStyles();

  const [upIcon, setUpIcon]= React.useState(BsShift);
  const [downIcon, setDownIcon] = React.useState(BsShift)
  // store
  const votedState = useSelector(state => state.voteCommentReducer)
  
  /* upVote or downVote a comment */
  const func_upVoteComment = (id) => {
    // check if comment has been downVoted
    if (votedState.downVoted === true) {
      // Remove downVote
      upVoteToComment(id);
      // Increase vote score by 1
      setScore(score + 1);
      // dispatch upVoteComment action
      dispatch(upVoteComment({id}))
      // Deselect downvote icon
      setDownIcon(BsShift)

      // set downVotedState to false
      dispatch(downVotedComment(false,id));
    } else {
      console.log('ns')
      if (votedState.upVoted === false ) {
        console.log('aa')
        // Call Api to upVote the comment
        upVoteToComment(id);
        // dispatch upVote action (increase count by 1)
        dispatch(upVoteComment({id}));

        // set upVotedState to true
        dispatch(upVotedComment(true,id));

        // Change icon to Filled icon
        setUpIcon(BsShiftFill);
        setDownIcon(BsShift);

        // Increase VoteScore by 1
        setScore(score +1)

      } else {
        console.log('else')
        downVoteToComment(id)

        // dispatch upVote action
        dispatch(downVoteComment({id}))
        // set upVotedState to false
        dispatch(upVotedComment(false,id));

        setUpIcon(BsShift);

        // Decrease vote score by 1 in the ui
        setScore(score - 1)
      }
    }
  }
  const func_downVoteComment = async (id) => {
    // Check if Comment was upVoted
    if (votedState.upVoted === true) {// Comment already upVoted
      // Remove upVote
      downVoteToComment(id);
      // Decrease vote score by 1 in the ui
      setScore(score - 1);

      // dispatch downVote action
      dispatch(downVoteComment({id}));
      // Deselect the upvote icon
      setUpIcon(BsShift);

      // set upVotedState to false
      dispatch(upVotedComment(false,id));
    } else { // Comment is not upVoted

      if (votedState.downVoted === false) {
        downVoteToComment(id);

        setDownIcon(BsShiftFill)
        setUpIcon(BsShift)

        // dispatch upVote action
        dispatch(downVoteComment({id}))

        // set upVotedState to true
        dispatch(downVotedComment(true,id));

        // Decrease vote score by 1
        setScore(score - 1)

      } else {
        console.log('else')
        // upVote Comment
        upVoteToComment(id)

        // dispatch upVote action
        dispatch(upVoteComment({id}))
        // set downVotedState to false
        dispatch(downVotedComment(false,id))

        setDownIcon(BsShift);

        // Increase VoteScore by 1
        setScore(score +1);

      }
    }
  }

  // State for voteScore.
  const [score, setScore] = React.useState(commentary.voteScore);


  return (
    <div>
    <CardActions >
      <Button
        className={classes.button}
        color='primary'
        startIcon={upIcon}
        onClick = {() => func_upVoteComment(commentary.id)}
      >
      {score}
      </Button>

      <Divider orientation="vertical" flexItem/>
      <Button
        className={classes.button}
        startIcon={downIcon} className={classes.rotate}
        onClick={() => func_downVoteComment(commentary.id)}
      >
      </Button>

    </CardActions>
    </div>
  )
}
