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
import { getPostByPostId, editPostById } from '../actions'
import {useSelector, useDispatch} from 'react-redux'
import { modalState } from '../actions'
import { getPostsByPostId, editPostByPostId } from '../utils/api'


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
    height: '120px',
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
    width: '50%',

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
  errorMessage: {
    margin:0,
    padding:0,
    color:'red',
    display: 'none'
  }
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

export default function EditPost({clickedPostId}){

  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState(false);

  /* called if modal is closed */
  const closeModal = () => {
    // dispatch action to set modal state close
    dispatch(modalState({open:false}))
  }

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


  /* Reference to dispatch function */
  const dispatch = useDispatch()
  const reload=()=>window.location.reload();

  /* Called when post button is clicked */
  const createPost = (e) => {

    //console.log(id)
    const post = {};
    post.id = clickedPostId;
    post.title = title
    post.body = bodys

    /* dispatch */
    //dispatch(addPost({post}))
    if (title !== '' || body !== '' || author !== '' ) {
      /* Update server with the edited Post object */
        editPostByPostId(post);
      /* dispatch */
      //dispatch(addNewPost({post}))
      // Close Modal
      closeModal()
      reload()
    } else {
      // Close Modal
      closeModal()
    }

  }

  // Get modal open state from store
  const modalIsOpen = useSelector(state => state.modalReducer.modalState)

  const [postByIds, setPostByIds] = React.useState([])

  const modea = useSelector(state => state.modalReducer.modalState)

  // Close edit post modal
  /*const closeModal = () = {
    dispatch(modalState({open:false,id:id})).
  }*/
  //console.log(modea)
  const getPostWithId = async () => {
      // Get the clicked posts id from store
      const currentPostId = modea.id;
      // Get post by the id
      //const elems = await getPostsByPostId(clickedPostId);
      const elems = await getPostsByPostId(currentPostId);
      setPostByIds(elems)
      // dispatch getPostByPostId action
      //const postIds = modalIsOpen.id
      dispatch(getPostByPostId({elems}))
      console.log(elems)
      // insert spinner for data to load
      setTitle(elems.title);
      setAuthor(elems.author);
      setBody(elems.body);
      setCategory(elems.category);
      return elems;

 };

  useEffect(() => {
    getPostWithId()

  },[])





  /* Body of modal */
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.modalHeader}>
      <h1 id="simple-modal-title" className={classes.h1}>Edit Post</h1>
      <IconButton aria-label="settings" className={classes.close} onClick={closeModal}>
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
          <option value={10}>React</option>
          <option value={20}>Redux</option>
          <option value={30}>Udacity</option>
        </NativeSelect>
      </FormControl>

      <h4 className={classes.h5}>Author</h4>
      <input className={classes.modalTitleBox}
      type='text'
      placeholder='e.g John Snow'
      value={author}
      onChange={changeAuthor} />
      <h5 className={classes.errorMessage} style ={{display: (author ==='' ? 'block':'none')}}>
        Author cannot be empty
      </h5>

      <h4 className={classes.h5}>Title</h4>
      <input className={classes.modalTitleBox}
      type='text'
      placeholder='Write Something'
      value={title}
      onChange={changeTitle}/>
      <h5 className={classes.errorMessage} style ={{display: (title ==='' ? 'block':'none')}}>
      Title cannot be empty
      </h5>

      <h4 className={classes.h5}>Body</h4>
      <textarea
      className={classes.modalTextBox}
      type='text'
      placeholder='Write Something'
      value={bodys}
      onChange={changeBody}/>
      <h5 className={classes.errorMessage} style ={{display: (bodys ==='' ? 'block':'none')}}>
       Body cannot be empty
       </h5>
      <Button variant="contained" color="primary" onClick={createPost}>
        Post
      </Button>
    </div>
  );

  return(
    <Modal
      className={classes.modal}
      open={modalIsOpen.open}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
