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
    /*<Card className={classes.cardRoot}>
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
          </div>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        />

      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        This will be the Title of the piece
      </Typography>

        <Typography variant="body2" color="textPrimary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

      <CardContent className={classes.comments}>
        <Typography variant="body2" color="textSecondary" component="p">
          24 comments
        </Typography>
      </CardContent>
      <Divider className={classes.dividerPadding}/>
      <CardActions >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbUpRoundedIcon />}
        >
          Like 11
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbDownRoundedIcon />}
        >
          Dislike 1
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ChatBubbleIcon />}
        >
          Comment 15
        </Button>
      </CardActions>
      <Divider className={classes.dividerPadding}/>
      <CardContent>
        <TextField
          className={classes.commentBox}
          fullWidth={true}
          id="outlined-textarea"
          multiline
          placeholder="Write a comment"
          variant="outlined"
        />
        <div className={classes.typo}>
          <div className={ classes.commentHeader}>
            <h5 className={ classes.h5}>Jane Doe</h5>
              <IconButton aria-label="settings" className={classes.close}  onClick={handleMenuClick}>
                <MoreHorizIcon />
              </IconButton>
          </div>
          <Typography variant="body2" color="textPrimary" component="p"  className={ classes.commentBlock}>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </div>

      </CardContent>



    </Card>*/
    <Posts/>

  )
}
