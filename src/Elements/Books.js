import React, { useContext, useState }  from 'react'
import Book from './Book'
import bookContext from '../Context/bookContext'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography,Modal,TextField } from '@mui/material';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
const style = {
  position: 'absolute',
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Books = () => {
    const {books,open,handleClose,quantity,setQuantity,makeAddCartReq} = useContext(bookContext);

    const handleQuantity = (event)=> {
      setQuantity(event.target.value)
    }
  return (
    <Container sx={{ flexGrow: 1, marginTop: '30px', marginBottom: '50px', marginLeft:'10px', marginRight: '10px', width: '100%'}}>
        {books.length>0 ?<Grid sx={{width: '100%'}} container spacing={2}>
                {books.map((item)=>{
                    return <Book bookItem={item} key={item.id} setQuantity={setQuantity} quantity={quantity}/>
                })}
        </Grid>:
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Search Not Found
        </Typography>}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Quantity
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="quantity"
              name="quantity"
              label="Quantity*"
              value={quantity}
              onChange={handleQuantity}
            />
          <Button onClick={()=>{makeAddCartReq();toast("Added to Cart")}} sx={{marginTop: "20px",fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
          Add
          </Button>
          </Box>
        </Modal>
        <Pagination/>
    </Container>
  )
}

export default Books
