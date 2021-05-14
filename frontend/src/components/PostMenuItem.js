import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { ListItemSecondaryAction } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  float: {
    marginLeft: 'auto',
  },
  }));
export default function PostMenuItem({ openEditModal, post,openAlertBox }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Open menu when MoreHoriz icon is clicked
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Display message for tooltip
  const longText ='Edit or Delete Post'

  return(
    <ListItemSecondaryAction>
      <Tooltip title={longText}>
        <IconButton aria-label="settings"
          aria-owns={anchorEl ? 'simple-menu' : null}
          className={classes.float}
          onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
          <MenuItem onClick={
            () => {
              openEditModal(post.id)
            handleMenuClose();

          }}> Edit Post
          </MenuItem>
          <MenuItem onClick= {
            () => {
            openAlertBox(post.id)
            handleMenuClose()}
          }>
            Delete Post
          </MenuItem>
      </Menu>
    </ListItemSecondaryAction>
  )
}
