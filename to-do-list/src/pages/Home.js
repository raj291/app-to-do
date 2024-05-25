import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Box, Grid ,IconButton, Typography} from '@mui/material';
import { MdAdd } from 'react-icons/md';
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddNotes from './AddNotes';
import axiosInstance from '../components/axios';

function Home() {
  const [isAddNotesVisible, setIsAddNotesVisible] = useState(false);
  const [currentNoteForEdit, setCurrentNoteForEdit] = useState(null);
  const [allNotes , setAllNotes] = useState([]);
  const [error, setError] = useState("");
  const handleAddNotesToggle = () => {
    setIsAddNotesVisible(!isAddNotesVisible);
  };
  const handleEditNote = (note) => {
    setCurrentNoteForEdit(note);
    //const hasTitleChanged = note.title !== currentNoteForEdit.title;
    //const hasContentChanged = note.content !== currentNoteForEdit.content;
    setIsAddNotesVisible(true);
    //if (hasTitleChanged || hasContentChanged) {
      deleteNotes(note);
    //}else{
      
    //}
    
  };

  const deleteNotes = async (data) =>{
    const noteId = data._id;
    try{
    const response = await axiosInstance.delete("/deletenote/" + noteId);
      if(response.data && !response.data.error){
        getAllNotes();
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }

    }
  }

  const getAllNotes = async () => {
    try{
      const response = await axiosInstance.get("/notesall");
      setAllNotes(response.data.notes);

    }
    catch(error){
      console.log("Unknown Error", error);
    }
    
  };
  useEffect(() =>{
    getAllNotes()
    return () => {};
  },[]);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: 4,
          mt: 10, 
        }}
      >
        <Grid container spacing={4}>
          {allNotes.map((item , index ) =>(
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            
              <NoteCard 
              
              title={item.title}
              date= {moment(item.createdOn).format('Do MMM YYYY')}
              content= {item.content}
              onEdit={() => handleEditNote(item)}
              onDelete={() => deleteNotes(item)}
            />
            </Grid>
            ))}  
        </Grid>

        <Box sx={{
          position: 'absolute',
          right: '2.5rem',
          bottom: '2.5rem',
        }}>
          <IconButton
            sx={{
              width: 64,
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50px',
              backgroundColor: '#E49B0F',
              color: 'white',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#e0d728',
                fontWeight:'700',
                transform: 'scale(1.2)'
              },
            }}
           onClick={handleAddNotesToggle}>
            <MdAdd size={32}/>
          </IconButton>
        </Box>
        {error && (
          <Box sx={{ color: 'red', marginTop: 2 }}>
            <Typography variant="subtitle2">{error}</Typography>
          </Box>
        )}

      </Box>
      {isAddNotesVisible && <AddNotes currentNote={currentNoteForEdit}
          onClose={handleAddNotesToggle} getAllNotes = {getAllNotes}/>}
    </>
  );
}

export default Home;