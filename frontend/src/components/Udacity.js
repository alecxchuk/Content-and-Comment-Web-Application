import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Posts from './Posts'




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  cardRoot: {
    width: '70%',
  },

  close: {
    marginLeft:'auto',
    justifyContent: 'flex-end',
    padding:0,

  },
  h3:{
    padding:0,
    margin:0
  },
  h5: {
    marginBottom:0,
    marginTop:4

  },
  commentHeader: {
    display: 'flex',
    marginLeft:8,
    marginRight: 8,



  },
  commentBlock: {
    marginLeft:8,
    paddingTop:0
  },

  typo:{
    width:'80%',
    borderRadius:'8px',
    background:'lavender',
    marginTop: '8px',
    paddingBottom: '8px'


  },
  button: {
    margin: theme.spacing(1),
    width: '33%'
  },
  dividerPadding: {
    marginLeft: 16,
    marginRight: 16
  },
  comments: {
    textAlign: 'center',
    textAlignLast: 'right',
  },
  commentBox: {
    width: '85%',
    border:'none',
    background:'lavender',
    outline: 'none',

  },
}));

export default function ReactCategory(){
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
  return (

    <Posts/>

  )
}
