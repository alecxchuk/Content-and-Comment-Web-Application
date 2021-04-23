import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VoteComment from './VoteComment'
import { borderRadius } from '@material-ui/system';
import FilledInput from '@material-ui/core/FilledInput';
import clsx from 'clsx';
import { getAllCommentsByPostId, addComment } from '../utils/api';
import {useSelector, useDispatch} from 'react-redux'
import '../App.css'
import ShowMoreText from 'react-show-more-text';
import Tooltip from '@material-ui/core/Tooltip';
import Menus from './MenuItemComment'
import { deleteComment, editComment } from '../utils/api'
import OnDeleteConfirmation from './OnDeleteConfirmation'


const useStyles = makeStyles((theme) => ({
  submit: {
    width:'25%',
    margin:8
  },
  bold: {
    fontWeight: 'bold',
  },
  commentContainer: {
    padding: 0,
    margin: 0,
    width: '92ch',

  },
  noPadding: {
    padding: 0,
    margin: 0,
  },
  alignCent: {
    width: '100%',
    alignItems:"center",
    padding: '8px 0px',
    margin: 0,
  },
}));

export default function Comments({expanded, commentId}) {
  const classes = useStyles();

  /* Reference to dispatch function */
  const dispatch = useDispatch()

  // State for storing comments from server
  const [comments, setComments] = React.useState();

  const getComments = async () => {
    // Get comments from server and store in state
    setComments(await getAllCommentsByPostId(commentId));
  }

  useEffect(() => {
    // getElements method call
    getComments()
  },[])

  // State and setter for comment in comment box
  const [newComment, setNewComment] = React.useState('');

  /* updates state with comment from text box */
  const handleComment =(e) => {
    setNewComment(e.target.value)
  }

  /* Called when add comment button is clicked */
  const addNewComment = (author, parentId) => {
    // New comment object
    const comment = {};
    // add elements and values to comment object
    comment.body = newComment;
    comment.author = author;
    comment.parentId = parentId;
    comment.timestamp = Date.now();
    // if a comment field is not empty
    if (newComment !== '') {
      // Update server with new comment
      addComment(comment);
      // Set the comment field to empty
      setNewComment('');
      // Update comment state with new comment object.
      setComments(comments.concat(comment));

    }
  }

  // Method to convert unix time to human date
  const convertUnixToDate = (time) => {
    var dates = new Date(time)
    return dates.toString();
  }

  // Text for tooltip
  const longText = `Click here to Input Name and picture. Default name is Anonymous`;

  // state to store particular comment being edited and its setter
  const [comm, setComm]= React.useState({})

  // Called when edit comment is clicked
  const edit_comment = (comment) => {

    //setNewComment(comment.body)
    // set editing state to true
    setEditingState(true);
    // store particular comment being edited
    setComm(comment);
  }

  // Cancel editing a comment
  const cancel_editing = () => {
    // Set the editing state to false
    setEditingState(false);
  }

  // state for if comment is being edited or not
  const [editing, setEditingState] = React.useState(false);

  // reload window
  const reload=()=>window.location.reload();

  // delete confirmation modal open or close state
  const [openDelAlertBox, setOpenDelAlertBox] = React.useState({})

  /* Open Delete confirm modal method */
  const openAlertBox = (id) => {
    setOpenDelAlertBox({
      [id]: true
    });
  }
  // Close Modal method
  const closeAlertBox = (id) => {
    setOpenDelAlertBox({
      [id]: false
    })
  }

  /* Method for deleting a comment */
  const delete_comment = (id) => {

    // Delete comment from server
    deleteComment(id);
    // remove comment using the comment id
    let arr = comments.filter(comment =>!comment.id.includes(id));
    // update state with new comment array.
    setComments(arr);
    reload();
    // Close delete confirmation modal after comment has been deleted
    closeAlertBox()
  }

  // State for if there is a change in the comment being updated
  const [ups, setUps] = React.useState(false);
  // State to store new update text being inputed
  const [updCom, setUpdCom] = React.useState('');
  // Called when text in input changes when updating a comment
  const handleUpdate = (e) => {
    // Text has changed
    setUps(true);
    // Store the new Text being inputed in state
    setUpdCom(e.target.value);
  }
  // Called when update comment button is clicked
  const updateComment = (id) => {
    // new comment object
    const comment = {}
    // add author
    comment.author= 'Anonymous';
    // add id
    comment.id = id;
    // add the body of the comment
    comment.body = updCom;
    // add the time comment was posted
    comment.timestamp = Date.now();
    // Update server with edited comment
    editComment(comment);
    // Set editing state to false since we are done editng a comment
    setEditingState(false);
    // Remove the previous comment from the comment array
    let arr = comments.filter(comment =>!comment.id.includes(id));
    // Add the updated comment to the comment array.
    setComments(arr.concat(comment))

  }

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <List component="div" className={classes.commentContainer}  disablePadding>
        <Divider  component="li" />
        <ListItem button className={classes.alignCent}  alignItems="flex-start" >
          <Tooltip title={longText}>
            <ListItemAvatar className={classes.noPadding}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
          </Tooltip>
          <FilledInput
              color="white"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleComment}
              multiline="true"
              fullWidth={true}
              disableUnderline="true"
              style={{  borderRadius: 25, background:'#e0e0e0' ,paddingTop:8}}
            />
          <Button variant="contained"
            color="primary"
            className = {classes.submit}
            size="small"
            style={{ borderRadius: 25 }}
            onClick={() => addNewComment('Anonymous', commentId)}>
            Add Comment
          </Button>
        </ListItem>
        <Divider component="li" />
        {comments !== undefined && (comments.map((comment) => (
          <ListItem key={comment.id} button alignItems="flex-start" className={classes.noPadding}  >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <div>
              <ListItemText secondary={convertUnixToDate(comment.timestamp)}>
                <Typography
                  className={classes.bold}
                  component="span"
                  variant="subtitle2"
                  color="textPrimary"
                >
                {comment.author}
                </Typography>
              </ListItemText>
              <ListItemText>
                <div >
                  <ShowMoreText
                    lines={3}
                    more='See More'
                    less='See Less'

                    className={comm.id === comment.id && editing ? 'none': 'block'}
                    anchorClass="anchor-more-text"
                    expanded={false}
                    width={650}
                  >
                  {comment.body}
                  </ShowMoreText>
                  <div style={{ display: (comm.id === comment.id && editing ? 'block' : 'none')}}>
                    <div style={{display: 'flex'}}>
                      <FilledInput
                        color="white"
                        placeholder="Write a comment..."
                        value= {ups ? updCom : comment.body}
                        onChange= {handleUpdate}
                        multiline="true"
                        fullWidth={true}
                        disableUnderline="true"
                        style={{  width :'100%', borderRadius: 25, background:'#e0e0e0' ,paddingTop:8}}
                      />
                      <Button variant="contained"
                        color="primary"
                        className = {classes.submit}
                        size="small"
                        style={{ borderRadius: 25 }}
                        onClick={() => updateComment(comment.id)}>
                        Update
                      </Button>
                    </div>
                    <span style={{paddingLeft:'8px', fontSize : '12px'}}>Press Esc to<a  style={{ color: 'blue', fontDecoration : 'underline', fontSize : '12px'}} onClick={cancel_editing}> Cancel Editing</a></span>
                  </div>
                </div>
                <VoteComment commentary={comment}/>
              </ListItemText>
              <Divider  component="li" />
            </div>
            <Menus
              editing={() => edit_comment(comment)}
              openAlertBox={() => openAlertBox(comment.id)}
              commenter={comment}
            />
            <OnDeleteConfirmation
              openAlertBox={openDelAlertBox}
              closeAlertBox={() => closeAlertBox(comment.id)}
              deleteComment={() => delete_comment(comment.id)}
              commenter={comment}
              caption='comment'/>
          </ListItem>
        )))}
      </List>
    </Collapse>

  )
}
