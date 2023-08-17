import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import bookContext from '../Context/bookContext';
import axios from 'axios';
// import {Item}
const Book = (props) => {
    const {bookItem} = props
    const {cart, setCart,handleOpen,setBookId} = useContext(bookContext)
    // const [quantity, ]
    // console.log(book);
    const addToCart = (e)=> {
        setBookId(bookItem.id)
        handleOpen()
        console.log(e.target)
        setCart([...cart,bookItem])
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      useEffect(()=>{
        document.getElementById(`${bookItem.id}-cartButton`).addEventListener('click',addToCart)
      },[])
  return (
    <Grid item xs={12} md={4} key={bookItem.id}>
        <Item sx={{display:'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', width:'100%', boxShadow: '2'}}>
            <Typography sx={{backgroundColor: '#9ED2BE', marginBottom:'5px', padding: '10px', fontSize:'1.2rem', width:'100%', fontWeight: '700', color: '#557A46', fontVariant:'petite-caps'}}>{bookItem.name}</Typography>
            <Box sx={{width: '100%',height: 'fit-content', backgroundColor: '#7EAA92', padding: '20px'}}>
                <img style={{width: '80%', aspectRatio: '1/1', borderRadius: '5px'}} src={bookItem.base64image}/>
            </Box>
            <Typography sx={{fontFamily: 'Josefin Sans'}}>
                
                <Typography variant='span' sx={{display: 'inline-block',fontWeight: '900'}} >{bookItem.category}</Typography>
                <br/>
                <Typography variant='p' sx={{display: 'inline-block', height: '40px', width: '100%', overflow: 'auto', msOverflowStyle:'none',"&::-webkit-scrollbar":{display: 'none'}}} >{bookItem.description}</Typography>
            </Typography>
            <Box sx={{backgroundColor: '#9ED2BE',margin: '10px', width: '100%',padding: '10px'}}>
            <Typography variant='span'  sx={{fontSize: '1.1rem', marginRight:'10px'}}>Price : {bookItem.price} ₹</Typography>
                <Button id={`${bookItem.id}-cartButton`} variant='outlined' onClick={addToCart}>Add To Cart</Button>
            </Box>
        </Item>
    </Grid>
  )
}

export default Book
