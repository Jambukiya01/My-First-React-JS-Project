import React, { useContext,useEffect } from 'react'
import bookContext from '../Context/bookContext'
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { toast } from 'react-toastify';
const Cart = () => {
    const {cart,user,placeOrder,getCartData} = useContext(bookContext)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user) {
          navigate('/login')
        }
        // eslint-disable-next-line
      },[]) 
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, marginTop: '30px', marginBottom: '50px', marginLeft:'10px', marginRight: '10px', width: '100%'}}>
        <Typography variant='h2' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',width:'100%',backgroundColor: theme.palette.secondary.light, textAlign: 'center', margin: '10px', borderRadius: '10px'}}>
          Cart 
        </Typography>
          {/* <Button variant='outlined' disabled={cart.length===0} onClick={()=>{placeOrder();toast("Order Placed")}} sx={{width: '150px',position: 'absolute', right: '0',color: theme.palette.secondary.dark}} >Remove All</Button> */}
        <Grid container spacing={2} sx={{textAlign: 'center'}}>
                {cart.length===0?<Typography variant='h4' sx={{width:'100%', textAlign: 'center',margin: '10px'}}>Nothing To Show</Typography>:cart.map((item)=>{
                    return <CartItem cartItem={item} key={item.id} />
                })}
        </Grid>
        <Button onClick={()=>{placeOrder();toast("Order Placed");}} sx={{display: cart.length===0?'none':'block',width: '150px',marginTop: '20px', backgroundColor: theme.palette.secondary.light, "&:hover": {backgroundColor: theme.palette.secondary.dark}}} variant='contained'>Place Order</Button>
    </Container>
  )
}

export default Cart
