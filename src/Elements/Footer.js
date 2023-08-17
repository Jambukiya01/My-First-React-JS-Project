import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import theme from '../styles/theme'
const Footer = () => {
  return (
    <Typography sx={{display: 'flex',alignItems:'center',justifyContent: 'center',fontSize: '1.2rem',marginTop: "20px", position: 'absolute',width: '100vw', bottom: '0px', fontFamily:'Josefin Sans', height: '30px', backgroundColor: theme.palette.secondary.light, boxSizing: 'border-box'}} variant="body2" align="center" >
      {'Copyright © '}
      <Link color="inherit" to="/" style={{color: 'black'}}>
        BookStore 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer
