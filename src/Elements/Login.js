import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import theme from '../styles/theme'
import bookContext from '../Context/bookContext';

// TODO remove, this demo shouldn't need to reset the theme.

const validationSchema = Yup.object({

  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
export default function Login() {
  const {onLogin,user,setUser,setAdmin } = useContext(bookContext)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("redirect..")
      // console.log(values)
      const payload = {
        email: values.email,
        password: values.password,
      }
      axios.post('https://book-e-sell-node-api.vercel.app/api/user/login',payload )
      .then((response)=>{
        console.log(response)
        setUser(response.data.result)
        if(response.data.result.role==='admin')
        setAdmin(response.data.result)
        
        navigate('/')
        toast.success('Logged In')
      })
      .catch((error)=>{
        toast.error(error.message)
      })
    },
  });


  return (
    <ThemeProvider theme={theme}>
    <Container sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: {md: 'row',xs: 'column'},
              alignItems: 'center',
              justifyContent: "center",
              width: {md: '100%',xs: '100%'},
              height: {md: '500px',xs: '80vh'},
              marginTop: {xs: '20px', sm: '50px', md: '80px'},
              position: 'relative'
            }}
            maxWidth="lg">
      <Box sx={{width: {md: '50%',xs: '100%'}, height: {md: '100%',sm: '30%',xs: '50%'}, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: '#d7d6d6',boxShadow: '3', boxSizing: 'border-box', padding: '10px'}}>
        <Typography component="h1" variant="h4" sx={{position: 'absolute',top: '10px', width: {md: '50%',xs: '80%'}, textAlign: 'center', fontFamily: 'Josefin Sans'}}>
              Welcome Back Buddy ! 
        </Typography>
        <Typography component="ul" variant="h6" sx={{marginTop: '80px', width:'100%'}}>
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                LogIn to Explore Most Valuable Site  
              </Typography> 
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                We Are Happy To See You Again! 
              </Typography> 
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                "Education Is Like Tigress's Milk. He Who Drinks, Does Not Live Without Roaring"  
              </Typography> 
        </Typography>
        <Button onClick={()=>{navigate('/signup')}} sx={{marginTop: "20px", position:'absolute', bottom: {md: '10px',sm: '70%', xs: '50%'}, left: {md: '25%',xs: '50%'}, transform: "translate(-50%,-50%)", fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
            Register
          </Button>
      </Box>
      <Box sx={{width:{md: '50%',xs: '100%'}, height:{md: '100%',sm: '70%',xs: '50%'}, boxSizing: 'border-box', padding: '10px',boxShadow: '3', display: 'flex', alignItems: 'center', justifyContent:"center", flexDirection: 'column'}}>
      <Typography component="h1" variant="h4" sx={{position: 'absolute', top:{md: '10px',sm: '35%',xs: '55%'}, fontFamily: 'Josefin Sans'}}>
            Log In 
          </Typography>
      <Box sx={{marginTop: {md: '70px',xs: '15%'}, width:'100%', height: {xs: '90%'}, boxSizing: 'border-box',display: 'flex', alignItems: 'center', justifyContent:"flex-start", flexDirection: 'column'}}>
      <form onSubmit={formik.handleSubmit} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:'100%',
      }}
      >
        <TextField
          fullWidth
          sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
          id="email"
          name="email"
          label="Email*"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
          id="password"
          name="password"
          label="Password*"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button sx={{position: {xs: 'absolute'},marginTop: "20px",bottom: {xs: '40px'}, fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
          LogIn
        </Button>
        </form>
      </Box>
      <Typography sx={{fontFamily: 'Josefin Sans'}}>
            Does not Registered Yet ? 
            <Typography variant='span' sx={{display: 'inline-block', textDecoration:'underline', fontFamily: 'Josefin Sans',cursor: 'pointer'}} onClick={()=>{navigate('/signup')}}>SignUp</Typography>
      </Typography>
      </Box>
    </Container>
  </ThemeProvider>
  );     

   
}
