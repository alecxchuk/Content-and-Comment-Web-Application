import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { addNewPost } from '../actions'
import {useSelector, useDispatch} from 'react-redux'
import { addPost } from '../utils/api'


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },

  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  close: {
    position: 'absolute',
    right: 0,
    marginRight:28,
  },

  h3:{
    marginTop: 6,
    marginBottom:4

  },
  h1:{
    padding:0,
    margin:0,
  },

  h5:{
    marginBottom:4
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
  },
  modalTextBox: {
    width: '100%',
    height: '35%',
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #bdbdbd',
    outline: 'none',
  },
  modalTitleBox:{
    width : '100%',
    height: '35px',
    padding: '10px',
    border: '1px solid #bdbdbd',
    outline: 'none',


  },
  paper: {
    position: 'absolute',
    width: 700,
    height: 600,
    backgroundColor: theme.palette.background.paper,

    borderRadius:'4px',
    boxShadow: theme.shadows[5],
    elevation:'4',
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
   /*margin: theme.spacing(1),*/
   width: '50%'
 },
  formControl: {

    minWidth: 120,
  },
}));

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




export default function NewPost({ opens, onClose, props}){

  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState();
  /* called if modal is closed */
  const handleClose = () => {
    setOpen(false);
  };

  /* State to store styling of the modal */
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  // State for select category dropDown inside modal
  const [category, setCategory] = React.useState('React');
  // handle change for category dropDown
  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [test, setTest] = React.useState(null);

  // State for author  inside modal
  const [author, setAuthor] = React.useState('');
  // Get the author from input and store in app component state
  const changeAuthor = (event) =>{
    setAuthor(event.target.value)
  }
  // State for title  inside modal
  const [title, setTitle] = React.useState('');
  // Get the title from input and store in app component state
  const changeTitle = (event) =>{
    setTitle(event.target.value)

  }
  // State for author inside modal
  const [bodys, setBody] = React.useState('');
  // Get the body from input and store in app component state
  const changeBody = (event) =>{
    setBody(event.target.value)
  }
  /* Generate unique ids */
  const makeid=(length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }

  /* Reference to dispatch function */
  const dispatch = useDispatch()
  /* Called when post button is clicked */
  const createPost = (e) => {
    /* Generates unigue 22 digit id */
    let id= makeid(22)
    //console.log(id)
    const post = [];
    const obj = {}
    obj.id = id;
    obj.title = title
    obj.body = bodys
    obj.author = author
    obj.category = category;
    obj.timestamp = Date.now();
    post.push(obj)
    //post.voteScore = 1;
    //post.deleted = false;
    //post.commentCount = 0;
    console.log(post)

    /* Update server with new Post */
    //addPost(post)
    /* dispatch */
    dispatch(addNewPost({post}))

    // Close Modal
    onClose()
    /* Empty modal fields */
    setAuthor('');
    setTitle('')
    setBody('');
  }


  const foodie = useSelector(state => state.postsReducer)

  useEffect(() => {

  },[])
  useEffect((data) => {
    //dispatch(addPost({id,author,title,bodys,category}))

  // Safe to add dispatch to the dependencies array
  }, [dispatch])

  /* Body of modal */
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.modalHeader}>
      <h1 id="simple-modal-title" className={classes.h1}>Create a Post</h1>
      <IconButton aria-label="settings" className={classes.close} onClick={onClose}>
        <CloseIcon/>
      </IconButton>
      </div>

      <h4 className={classes.h3}>Category</h4>
      <FormControl className={classes.margin} >
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={changeCategory}
          input={<BootstrapInput />}
        >

          <option value={'React'}>React</option>
          <option value={'Redux'}>Redux</option>
          <option value={'Udacity'}>Udacity</option>
        </NativeSelect>
      </FormControl>

      <h4 className={classes.h5}>Author</h4>
      <input className={classes.modalTitleBox}
      type='text'
      placeholder='e.g John Snow'
      value={author}
      onChange={changeAuthor} />

      <h4 className={classes.h5}>Title</h4>

      <input className={classes.modalTitleBox}
      type='text'
      placeholder='Write Something'
      value={title}
      onChange={changeTitle}/>

      <h4 className={classes.h5}>Body</h4>
      <textarea
      className={classes.modalTextBox}
      type='text'
      placeholder='Write Something'
      value={bodys}
      onChange={changeBody}/>
      <p id="simple-modal-description">


      </p>
      <Button variant="contained" color="primary" onClick={createPost}>
        Post
      </Button>
    </div>
  );

  return(
    <Modal
      className={classes.modal}
      open={opens}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
