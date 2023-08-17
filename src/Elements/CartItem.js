import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography,TextField } from '@mui/material';
import bookContext from '../Context/bookContext';
import { toast } from 'react-toastify';
const CartItem = (props) => {
    const {cartItem} = props
    const {cart, setCart,deleteFromCart,quantity,setQuantity} = useContext(bookContext)
    const [cartItemQuantity,setCartItemQuantity] = useState(cartItem.quantity)
    // console.log(book);
    const removeFromCart = (e)=> {
        console.log(e.target)
        deleteFromCart(cartItem.id)
        toast("Removed from Cart")
    }
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      useEffect(()=>{
        document.getElementById(`${cartItem.id}-cartButton`).addEventListener('click',removeFromCart)
      },[cart])
  return (
    <Grid item xs={12} sm={4} key={cartItem.id}>
        <Item sx={{display:'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', width:'100%', boxShadow: '2'}}>
            <Typography sx={{backgroundColor: '#9ED2BE', marginBottom:'5px', padding: '10px', fontSize:'1.2rem', width:'100%', fontWeight: '700', color: '#557A46', fontVariant:'petite-caps'}}>{cartItem.book.name}</Typography>
            <Box sx={{width: '100%',height: 'fit-content', backgroundColor: '#7EAA92', padding: '20px'}}>
                <img style={{width: '80%', aspectRatio: '1/1', borderRadius: '5px'}} src={cartItem.book.base64image}/>
            </Box>
            <Typography sx={{fontFamily: 'Josefin Sans'}}>
                
                <Typography variant='span' sx={{display: 'inline-block',fontWeight: '900'}} >{cartItem.book.category}</Typography>
                <br/>
                <Typography variant='p' sx={{display: 'inline-block', height: '40px', width: '100%', overflow: 'auto', msOverflowStyle:'none',"&::-webkit-scrollbar":{display: 'none'}}} >{cartItem.book.description}</Typography>
            </Typography>
            <Box sx={{backgroundColor: '#9ED2BE',margin: '10px', width: '100%',padding: '10px'}}>
                <Typography variant='span'  sx={{fontSize: '1.1rem', marginRight:'10px'}}>Price : {cartItem.book.price} ₹</Typography>
                <Typography variant='span'  sx={{fontSize: '1.1rem', marginRight:'10px'}}>Quantity : {cartItem.quantity} </Typography>
                <br/>
                {/* <TextField
                    fullWidth
                    sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
                    id="quantity"
                    name="quantity"
                    label="Quantity*"
                    value={cartItemQuantity}
                    onChange={handleCartItemQuantity}
                /> */}
                <Button id={`${cartItem.id}-cartButton`} sx={{marginTop: '10px'}} variant='outlined'>Remove</Button>
            </Box>
        </Item>
    </Grid>
  )
}

export default CartItem
