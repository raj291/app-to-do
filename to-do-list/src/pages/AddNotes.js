import { TextField, Box, Typography, Button, IconButton } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../components/axios';

// add noteData later if its an issue
function AddNotes({ type ,getAllNotes , onClose , currentNoteForEdit }) {
    const [title , setTitle ] = useState("");
    const [content, setContent] = useState("");
    const [error,setError] = useState("");
    
    const handleAddNote = async () => {
        if (!title) {
            setError("Please Enter a Title");
        } else {
            setError("");
            await addNewNotes(); 
        }
        
        
    };
    const addNewNotes = async () =>{
      try{
        const response = await axiosInstance.post("/AddNotes" ,{
          title,
          content,
        });
        if(response.data && response.data.note){
          getAllNotes();
          onClose();
        }
      }catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }

      }
    }
   /* const editNote = async (data) =>{
      const noteId = data._id
      try{
        const response = await axiosInstance.put("/EditNotes/" + noteId,{
          title,
          content,
        });
        if(response.data && response.data.note){
          getAllNotes();
          onClose();
        }
      }catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }

      }

    }*/

    const handleSave = async () => {
      if (!title) {
        setError("The title is required.");
        return;
      }
    
      try {
        if (currentNoteForEdit) {
          await axiosInstance.put(`/EditNotes/${currentNoteForEdit._id}`, {
            title,
            content,
          });
        } else {
          await axiosInstance.post("/AddNotes", {
            title,
            content,
          });
        }
    
        getAllNotes();
        onClose();
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
      }
    };
  return (
    <Box sx={{ position: 'fixed', zIndex: 1000, backgroundColor: 'white',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems:'center',
        justifyContent:'center',

     }}>
    <Box sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        mx: 'auto',
        mt : 15,
        p: 5
      }}>
      <IconButton
        onClick={onClose} 
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          m: 2, 
        }}
      >
        <MdClose />
      </IconButton>
    
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Typography variant="h6">Title</Typography>
        <TextField
          variant="outlined"
          size="large"
          placeholder="Type Here"
          sx={{ width: '100%' }}
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, m: 2 }}>
        <Typography variant="h6">Content</Typography>
        <Textarea
          multiline
          rows={3}
          placeholder="Content"
          value={content}
          onChange={({target}) => setContent(target.value)}
          sx={{
            width: '100%',
            p: 2,
            borderRadius: '4px',
            backgroundColor: '#f3f4f6',
            fontSize: '0.875rem',
            
          }}
        />
        {error && <p style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 'small'
            }}>{error}</p>}
        <Button  onClick={handleSave} variant="contained" sx={{
          mt: 3,
          padding: 2,
          fontSize: 'medium'
        }}>Add</Button>
      </Box>
      </Box>
    </Box>
  );
}

export default AddNotes;    