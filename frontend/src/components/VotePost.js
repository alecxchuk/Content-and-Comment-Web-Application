import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { BsShift } from "react-icons/bs";
import { BsShiftFill } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { upVote, downVote, upVoted, downVoted } from '../actions'
import { upVoteToPost, downVoteToPost } from '../utils/api'
import Comments from './Comments'

import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  /*root: {
    display: 'flex',
  },*/
  display: {
    display: 'flex',
    padding: '4px 0px'
  },

  rotate: {
    transform: 'rotate(180deg)',
  },
  button: {
    //margin: theme.spacing(1),
    width: '0px',
  },
  chat: {
    marginLeft:'8px'
  }
}));

export default function VotePost({posters}) {
  /* Reference to dispatch function */
  const dispatch = useDispatch();
  const classes = useStyles();
  // upIcon state and setter
  const [upIcon, setUpIcon]= React.useState(BsShift);
  // down icob state and setter
  const [downIcon, setDownIcon] = React.useState(BsShift)
  // get upvote and downvote state from redux store.
  const votedState = useSelector(state => state.voteReducer)

  /* upVote or downVote a post */
  const upVotePost = async (id) => {
    // check if post has been downVoted
    if (votedState.downVoted === true) {
      // Remove downVote
      upVoteToPost(id);
      // Increase vote score by 1
      setScore(score + 1);
      // dispatch upVote action
      dispatch(upVote({id}))
      // Deselect downvote icon
      setDownIcon(BsShift)

      // set downVotedState to false
      dispatch(downVoted(false,id));
    } else {
      // Check if post has been upVoted before
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

        // Increase VoteScore by 1
        setScore(score +1)
      } else { // Post has already been upVoted
        // Remove upVote
        downVoteToPost(id)

        // dispatch downVote action
        dispatch(downVote({id}))
        // set upVotedState to false
        dispatch(upVoted(false,id));

        // Deselect upvote icon
        setUpIcon(BsShift);

        // Decrease vote score by 1 in the ui
        setScore(score - 1)
      }
    }
  }
  const downVotePost = async (id) => {
    // Check if Post was upVoted
    if (votedState.upVoted === true) {// Post already upVoted
      // Remove upVote
      downVoteToPost(id);
      // Decrease vote score by 1 in the ui
      setScore(score - 1);

      // dispatch downVote action
      dispatch(downVote({id}));
      // Deselect the upvote icon
      setUpIcon(BsShift);

      // set upVotedState to false
      dispatch(upVoted(false,id));
    } else { // Post is not upVoted
    // Check if Post is downvoted
    if (votedState.downVoted === false) { // Post is not downvoted
      // Downvote Post
      downVoteToPost(id);
      // Select downvote icon
      setDownIcon(BsShiftFill);

      // dispatch downVote action
      dispatch(downVote({id}));

      // set downVotedState to true
      dispatch(downVoted(true,id));

      // Decrease vote score by 1
      setScore(score - 1)

    } else { // Post is already downvoted

      // Remove upVote
      upVoteToPost(id);

      // dispatch upVote action
      dispatch(upVote({id}));
      // set downVotedState to false
      dispatch(downVoted(false,id));

      // Deselect downvote icon
      setDownIcon(BsShift);

      // Increase VoteScore by 1
      setScore(score +1);

    }
  }
  console.log(votedState.downVoted)
    console.log(votedState.upVoted)
  }

  // Set if comment section is expanded or not
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Comment Section expanded State
  const [expanded, setExpanded] = React.useState(false);
  // date state and setter.
  const [date, setDate] = React.useState((new Date).toString())
  // Converet unix time to human date.
  const convertUnixToDate = (time) => {
    var dates = new Date(time)
    return dates.toString();
  }

  // State for voteScore.
  const [score, setScore] = React.useState(posters.voteScore);

  return (
    <div >
      <div className={classes.display}>
      <Button
        className={classes.button}
        color='primary'
        startIcon={upIcon}
        onClick = {() => upVotePost(posters.id)}
      >
        {score}
      </Button>

      <Divider orientation="vertical" flexItem/>
      <Button
        className={classes.button}
        startIcon={downIcon} className={classes.rotate}
        onClick={() => downVotePost(posters.id)}
      >
      </Button>

      <Button
        className={classes.chat}
        startIcon={<BsChat />}
        onClick ={handleExpandClick}
      >
        {posters.commentCount}
      </Button>
      </div>

    {
      <Comments expanded={expanded}
      commentId = {posters.id}/>
    }
    </div>
  )
}
