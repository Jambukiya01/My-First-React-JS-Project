import react, { useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import theme from '../styles/theme'
import axios from 'axios';
import {toast} from 'react-toastify'
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import bookContext from '../Context/bookContext';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const validationSchema = Yup.object({
  firstName: Yup
    .string('Enter your First Name')
    .min(2, 'Too Short')
    .required('First Name is required'),
  lastName: Yup
    .string('Enter your Last Name')
    .min(2, 'Too Short')
    .required('Last Name is required'),
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
export default function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("redirect..")
      console.log(values)
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        roleId: parseInt(Math.random()*1000)
      }
      axios.post('https://book-e-sell-node-api.vercel.app/api/user',payload )
      .then((response)=>{
        console.log(response)
        toast.success("Registered Successfully")
        navigate('/login')
      })
      .catch((error)=>{
        toast.error(error.code)
      })
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Container sx={{
      display: 'flex',
      flexDirection: {md: 'row',xs: 'column'},
      alignItems: 'center',
      justifyContent: "center",
      // boxShadow: '3',
      width: '100%',
      height: {md: '500px',xs: '80vh'},
      position: 'relative',
      padding: '0px',
      marginTop: {xs: '20px', sm: '50px', md: '80px'}
    }}
    maxWidth="lg">
      <Box sx={{width: {md: '50%',xs: '95%'}, height: {md: '100%',sm: '30%',xs: '40%'}, display: 'flex', alignItems: {md: 'flex-start',xs: 'center'}, justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: '#d7d6d6',boxShadow: '3', boxSizing: 'border-box', padding: '10px'}}>
        <Typography component="h1" variant="h4" sx={{position: 'absolute',top: '10px', width: '50%', textAlign: 'center', fontFamily: 'Josefin Sans'}}>
              Follow Instructions 
        </Typography>
        <Typography component="ul" variant="h6" sx={{marginTop: '80px'}}>
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                FirstName and LastName must be greater than 1.  
              </Typography> 
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                Email must be valid.  
              </Typography> 
              <Typography component="li" variant="li" sx={{textAlign: 'start', fontFamily: 'Josefin Sans'}}>
                Password length must be greater than 7  
              </Typography> 
        </Typography>
        <Button onClick={()=>{navigate('/login')}} sx={{marginTop: "20px", position:'absolute', bottom: {md: '10px',xs: '60%',sm: '70%'}, left: {md: '25%',xs: '50%'}, transform: "translate(-50%,-50%)", fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
            LogIn
          </Button>
      </Box>
      <Box sx={{width: {md: '50%',xs: '95%'}, height:{md: '100%',sm: '70%',xs: '60%'}, boxSizing: 'border-box', padding: '10px',boxShadow: '3', display: 'flex', alignItems: 'center', justifyContent:"space-between", flexDirection: 'column'}}>
        <Typography component="h1" variant="h4" sx={{position: 'absolute',top: {md: '10px',xs: '43%', sm: '35%'}, textAlign: 'center', fontFamily: 'Josefin Sans'}}>
              Register Here 
        </Typography>
        <Box sx={{marginTop: {xs:'28px', sm: '80px', md: '40px'},width:'100%',height: '100%' }}>
          <form onSubmit={formik.handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:'100%'}}>
          <TextField
            fullWidth
            sx={{marginTop: {xs: '5px', md: '15px'},fontFamily: 'Josefin Sans'}}
            id="firstName"
            name="firstName"
            label="FirstName*"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            sx={{marginTop: {xs: '5px', md: '15px'},fontFamily: 'Josefin Sans'}}
            id="lastName"
            name="lastName"
            label="LastName*"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            sx={{marginTop: {xs: '5px', md: '15px'},fontFamily: 'Josefin Sans'}}
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
            sx={{ marginTop: {xs: '5px', md: '35px'},fontFamily: 'Josefin Sans'}}
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
          <Button sx={{marginTop: "20px",position: {xs: 'absolute'},bottom: {xs:'25px',sm : '40px', md: '45px'}, fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit" >
            Register
          </Button>
          </form>
        </Box>
          <Typography sx={{fontFamily: 'Josefin Sans'}}>
            Already Registered ? <Typography variant='span' sx={{display: 'inline-block', textDecoration:'underline', fontFamily: 'Josefin Sans',cursor: 'pointer'}} onClick={()=>{navigate('/login')}}>LogIn</Typography>
          </Typography>
        
      </Box>
      
    </Container>
    </ThemeProvider>
  );
}