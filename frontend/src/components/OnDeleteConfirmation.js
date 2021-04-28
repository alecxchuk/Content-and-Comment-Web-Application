import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius:'8px',
    padding: theme.spacing(2, 4, 3),
    outline:0
  },
  heading: {
    display: 'flex',
    alignItems:"center",
  },
  noMargin: {
    margin:0,
    padding:0
  },
  float:{
    marginLeft:'auto',
    margin:0,
    padding:0,
  },
  cancel: {
    display: 'flex',
    float:'right',
  },
  typography:{
    padding:'16px 0px'
  }
}));

export default function OnDeleteConfirmation({openAlertBox,closeAlertBox,commenter,deleteComment, caption}) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  // Delete Message
  const deleteWarning = `Are you sure you want to delete this ${caption}?`

  // Body of the modal
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.heading}>
        <h2 className = {classes.noMargin}>Delete Comment</h2>
        <IconButton aria-label="cancel"
          className={classes.float}
          onClick={closeAlertBox}
        >
          <CancelIcon   fontSize='large' color='action'/>
        </IconButton>
      </div>
      <Typography className={classes.typography}>{deleteWarning}</Typography>
      <div className={classes.cancel}>
        <Button color="primary" onClick={closeAlertBox}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => deleteComment(commenter.id)}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div>
     <Modal
      open={openAlertBox[commenter.id]}
      onClose={closeAlertBox}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
     >
       {body}
     </Modal>
    </div>
  )
}
