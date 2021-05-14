import React, { useEffect, useState } from 'react';
import '../App.css'
import NewPost from './EditPost'


export default function NoPostFound() {
  /* State to store modal state(open or close) and its setter (setOpen)*/
  const [open, setOpen] = React.useState(false);
  /* called if new post modal is open */
  const handleOpen = () => {
    setOpen(true);
  };
  /* called if new Post modal is closed */
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='center'>
      <div className='centers'>
        <h2>No posts found</h2>
        <a href='' onClick={handleOpen}> Add a Post </a>
      </div>
      <NewPost
        opens={open}
        onClose={handleClose}
      />
    </div>
  );
}
