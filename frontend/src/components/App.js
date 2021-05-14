import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Home from './Home'
import ReactCategory from './React'
import ReduxCategory from './ReduxCategory'
import UdacityCategory from './Udacity'
import TuneIcon from '@material-ui/icons/Tune';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { getPostsByCategory } from '../actions'
import { useDispatch} from 'react-redux'
import NewPost from './EditPost'



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  padding:{
    padding: 0,
  },
  sort: {
    textAlignLast:'right'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

/* Redux icon */
function ReduxIcon(props) {
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#764ABC"><path d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/><path d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/><path d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"/></g></SvgIcon>
  );
}

/* Udacity icon */
function UdacityIcon(props) {
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="#02b3e4"><path d="M13.3 0L0 7.7v17.6C0 33.4 6.5 40 14.6 40c2.7 0 5.2-.7 7.4-1.9l10.8-6.2C37.1 29.6 40 25.2 40 20V1.6L37.4.1 26 6.2v19.2c0 .8-.1 1.6-.2 2.4-.2.8-.4 1.5-.7 2.2l-.3.6c-.4 0-2.9-.9-4.2-1.8-.6-.4-1.1-.8-1.6-1.3s-.9-1-1.3-1.6c-.4-.6-.7-1.2-1-1.8-.3-.6-.5-1.3-.6-2-.1-.7-.1-1.4-.1-2.1V1.6L13.3 0zm6.5 36.2c-.7.3-1.7.7-2.5.9-.8.2-1.5.2-2.3.2-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.4-2.2-.7-.7-.3-1.4-.7-2-1.1C6.6 34.1 5.7 33.1 5 32c-.4-.6-.8-1.3-1.1-2-.3-.7-.5-1.5-.7-2.3-.2-.8-.2-1.6-.2-2.4V9.2l10-6.1V20c0 6.4 4.7 11.8 10.7 13.1-.2.3-.4.6-.7.8-1.1 1.1-2 1.8-3.2 2.3zm17-14c-.1.7-.4 1.4-.6 2-.3.6-.6 1.2-1 1.8-.4.6-1.6 2.1-3.2 3-1.6.9-3.1 1.2-4 1.4.6-1.6 1-3.2 1-5V7.7l8-4.6V20c0 .8 0 1.5-.2 2.2z"/></g></SvgIcon>
  );
}

/* React icon */
function ReactIcon(props) {
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
  <title>React Logo</title>
  <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
  <g stroke="#61dafb" strokeWidth="1" fill="none">
    <ellipse rx="11" ry="4.2"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </g></SvgIcon>
  );
}



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function App(props) {

  /* Reference to dispatch function */
  const dispatch = useDispatch()

  /* State for index of category option */
  const [value, setValue] = React.useState(0);

  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  /*  set state to index of the clicked category */
  const handleChange = (index) => {
    // change state to the value of index
    setValue(index)
    // variable to store category
    var category;
    // Match the index with Post category
    switch(index) {
      case 0:
      category = undefined;
      break;
      case 1:
      category='react';
      break;
      case 2:
      category='redux';
      break;
      case 3:
      category='udacity';
      break;
      default:
      break;
    }
    // Update the redux store with the category clicked
    dispatch(getPostsByCategory(category));
  }

  // State for select category dropDown inside modal
  const [sortMethod, setSortMethod] = React.useState('mimimum');

  // handle change for category dropDown
  const changeSorting = (event) => {
    setSortMethod(event.target.value);
  };

  /* called if new post modal is open */
  const handleOpen = () => {
    setOpen(true);
  };

  // reload window
  const reload=()=>window.location.reload();

  /* called if new Post modal is closed */
  const handleClose = () => {
    setOpen(false);
  };

  // state for sort menu open and close
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Open sort menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Close styled menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [postAdded,setPostAdded] = React.useState(false);
  //console.log(postAdded)

  useEffect(() => {
    setPostAdded(false)
  },[postAdded])

  const newPostAdded =()=>{

    setPostAdded(true)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Categories
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Home', 'React', 'Redux', 'Udacity'].map((text, index) => (
              <ListItem button key={text}
                /* Set state to the index value of the clicked list item*/
                onClick = {()=>(index===0) ? handleChange(0): (index===1) ? handleChange(1):
                  (index===2) ? handleChange(2): (index===3) ? handleChange(3) : undefined}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon/>}
                  {index === 1 && <ReactIcon size={24}/>}
                  {index === 2 && <ReduxIcon size={24}/>}
                  {index === 3 && <UdacityIcon size={24}/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Add New Post'].map((text, index) => (
              <ListItem button key={text}
              onClick={handleOpen}>
                <ListItemIcon>{index === 0 && <AddBoxIcon size={24} color="secondary"/>}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <NewPost
        opens={open}
        onClose={handleClose}
        newPostAddeds={newPostAdded}
      />

      <main className={classes.content}>
        <Toolbar />
        <div className={classes.sort}>
          <span>Sort By: minimum</span>

          <IconButton aria-label="settings" onClick={handleMenuClick}>
            <TuneIcon className={classes.padding}/>
          </IconButton>

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <StyledMenuItem  dense={true} >
            <ListItemIcon  >
              <RadioButtonCheckedIcon color="secondary" fontSize="small"  />
            </ListItemIcon>
            <ListItemText primary="minimum" />
          </StyledMenuItem>
          <StyledMenuItem dense={true}>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="order by voteScore" />
          </StyledMenuItem>
          <StyledMenuItem dense={true}>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="order by timestamp" />
          </StyledMenuItem>
        </StyledMenu>
        </div>
        {/* Home Category is clicked */}
        {value === 0 && (
          /* Display contents of home component */
          <Home/>
        )}

        {/* React Category is clicked */}
        {value === 1 && (
          /* Display contents of react component */
          <ReactCategory/>
        )}

        {/* Redux Category is clicked */}
        {value === 2 && (
          /* Display contents of react component */
          <ReduxCategory/>
        )}

        {/* Udacity Category is clicked */}
        {value === 3 && (
          /* Display contents of react component */
          <UdacityCategory/>
        )}
      </main>
    </div>
  );
}

//export default App;
