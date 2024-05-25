
import {MdCreate,MdDelete} from 'react-icons/md'
 import { styled } from '@mui/system';
 import { Box, IconButton, Typography} from '@mui/material'
 const  NoteCard = ({title,date,content,onEdit,onDelete, handleSave }) => {
    const StyledBox = styled(Box)({
        
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        },

        '.text-sm': {
          fontSize: '1.2rem',
          
        },
        '.font-medium': {
          fontWeight: 500,
        },
        '.text-xs': {
          fontSize: '1rem',
        },
        '.text-slate-500': {
          color: '#64748b',
          fontSize: '0.87rem',
        },
        '.flex': {
          display: 'flex',
        },
        '.items-center': {
          alignItems: 'center',
        },
        '.gap-2': {
          gap: '0.5rem',
        },
        '.icon-btn:hover': {
          color: 'inherit', 
        },
        '.hover\\:text-green-600:hover': {
          color: '#16a34a',
        },
        '.hover\\:text-red-600:hover': {
          color: '#dc2626',
        },
      });
  return (
    <StyledBox>
    <Box sx={
        {
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            width:'300px',
        }
    }>
      <Box>
        <Typography className="text-sm font-medium">
          {title}
        </Typography>
        <Typography className="text-xs text-slate-500">
          {date}
        </Typography>
      </Box>
    </Box>
    <Typography className='text-xs text-slate-600 mt-2'>
      {content?.slice(0, 60)}
    </Typography>
    <Box sx={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '5rem',
  marginLeft:'5rem',
    }}>
  <Box sx={{ marginLeft: 'auto' }}>
    <IconButton onClick={() => onEdit()}>
      <MdCreate className='icon-btn hover:text-green-600' />
    </IconButton>
    <IconButton onClick={onDelete}>
      <MdDelete className='icon-btn hover:text-red-600' />
    </IconButton>
  </Box>
</Box>
  </StyledBox>
);
}

export default NoteCard;