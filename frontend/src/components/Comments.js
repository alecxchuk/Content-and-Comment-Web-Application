import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VoteComment from './VoteComment'
import { borderRadius } from '@material-ui/system';
import FilledInput from '@material-ui/core/FilledInput';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';

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
    marginTop:4,


  },
  commentHeader: {
    display: 'flex',
    marginRight: 8,



  },
  commentBlock: {
    marginLeft:0,
    marginRight: 8,
    paddingTop:0
  },

  typo:{
    width:'100%',
    borderRadius:'8px',
    /*background:'lavender',*/
    marginTop: '8px',
    marginLeft: 8,
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
    width: '100%',
    border:'none',
    borderRadius:24,
    marginLeft: 8,
    marginBottom: 8,
    marginRight:8,
    marginTop: 8,
    height:0,

    /*background:'lavender',*/
    outline: 'none',
  },
  submit: {
    width:'25%',
    margin:8
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    //backgroundColor: red[500],
  },
  bold: {
    fontWeight: 'bold',
  },
  block: {
    display: 'block',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  commentContainer: {
    padding: 0,
    margin: 0,

  },
  radius: {
    boarderRadius: '108px',
  },
  alignCent: {
    alignItems:"center",
    padding: '8px 0px',
    margin: 0,
  },
}));
export default function Comments({expanded}) {
  const classes = useStyles();

  /*const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };*/

  return (
    /*<Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <div>
          <div className = {classes.root}>
            <TextField
              className={classes.commentBox}
              fullWidth={true}
              id="outlined-textarea"
              multiline
              placeholder="Write a comment"
              variant="outlined"
            />
            <Button variant="contained" color="primary" className = {classes.submit}>
              Add Comment
            </Button>
          </div>
          <Divider />
          <div className={classes.typo}>
            <div className={ classes.commentHeader}>
              <h5 className={ classes.h5}>Jane Doe</h5>

            </div>
            <Typography className={ classes.commentBlock} variant="body2">4d ago</Typography>
            <Typography variant="body2" color="textPrimary" component="p"  className={ classes.commentBlock}>
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </div>
        </div>
      </CardContent>
    </Collapse>*/
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" className={classes.commentContainer}  disablePadding>
        <Divider  component="li" />
          <ListItem button className={classes.alignCent}  alignItems="flex-start" >
            <ListItemAvatar className={classes.commentContainer}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>

            {/*<TextField

              fullWidth={true}
              id="outlined-textarea"
              multiline
              placeholder="Write a comment"
              variant="outlined"
              size="small"

            />*/}
            <FilledInput

              color="white"
              placeholder="Write a comment..."

              multiline="true"
              fullWidth={true}
              disableUnderline="true"
              style={{  borderRadius: 25, background:'#e0e0e0' ,paddingTop:8}}
            />
            <Button variant="contained" color="primary" className = {classes.submit} size="small" style={{ borderRadius: 25 }}>
              Add Comment
            </Button>
          </ListItem>
          <Divider  component="li" />
          <ListItem button alignItems="flex-start" className={classes.commentContainer}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <div>
            <ListItemText >
            <Typography
              className={classes.bold}
              component="span"
              variant="subtitle2"
              color="textPrimary"
            >
            John Okafor
            </Typography>
            <Typography
              className={classes.bold}
              component="span"
              variant="subtitle2"
              color="default"
              className={classes.block}
            >
             2h ago
            </Typography>
            <Typography
              className={classes.block}
              component="span"
              variant="subtitle2"

              color="textPrimary"
            >
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <VoteComment/>
            </ListItemText>
            </div>
          </ListItem>
        </List>
      </Collapse>

  )
}
