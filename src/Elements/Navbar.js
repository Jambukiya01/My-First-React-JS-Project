import React,{useContext,useState} from 'react';
import { styled, alpha,ThemeProvider } from '@mui/material/styles';
import {AppBar,Box,Toolbar,IconButton,Typography,InputBase,Badge,MenuItem,Menu} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import bookContext from '../Context/bookContext';
import theme from '../styles/theme';
import { CssBaseline } from '@mui/material';

const toggleRouteBtns = ()=> {
  if(!document.getElementById('routedBtns')) 
  return;
  if(document.getElementById('routedBtns').style.display === "flex")
  document.getElementById('routedBtns').style.display = "none"
  else
  document.getElementById('routedBtns').style.display = "flex"
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const {user,setUser,cart,keyword,getBooks,setKeyword,setPageIndex,admin,setAdmin} = useContext(bookContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const searchHandle = (e)=>{
    setKeyword(e.target.value)
  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?<MenuItem sx={{fontFamily: 'Josefin Sans'}} onClick={()=>{setUser('');setAdmin('');navigate('/login');handleMenuClose()}}>LogOut</MenuItem>:(
      // <>
        <MenuItem sx={{fontFamily: 'Josefin Sans'}} onClick={()=>{navigate('/login');handleMenuClose()}}>Login</MenuItem>
        // <MenuItem sx={{fontFamily: 'Josefin Sans'}} onClick={()=>{navigate('/signup');handleMenuClose()}}>SignUp</MenuItem>
      // </>
      )}
      {!user && <MenuItem sx={{fontFamily: 'Josefin Sans'}} onClick={()=>{navigate('/signup');handleMenuClose()}}>SignUp</MenuItem>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>{user?navigate('/cart'):navigate('/login')}}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart.length} variant='dot' color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p style={{fontFamily: 'Josefin Sans'}}>Cart</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p style={{fontFamily: 'Josefin Sans'}}>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{fontFamily: 'Josefin Sans'}}>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Box sx={{ flexGrow: 1, width: '100vw', position: 'sticky',top: 0,zIndex: 2 }}>
      <AppBar position="static" color='secondary'>
        <Toolbar sx={{position: 'relative'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2,cursor: 'pointer' , display: {xs: 'block', sm: 'none'} }}
            onFocus={toggleRouteBtns}
            onBlur={toggleRouteBtns}
            // onClick={toggleRouteBtns}
          >
            <MenuIcon />
          </IconButton>
          <Box id='routedBtns' sx={{display: {xs:'none',sm:'flex'},zIndex: 1,boxShadow: {xs:3,sm: 0},borderRadius: {xs:'5px',sm: 0},width: {xs: '75px',sm:'fit-content'},alignItems: 'center', justifyContent: 'space-between',flexDirection: {xs: 'column',sm: 'row'}, position: {xs: 'absolute', sm: 'static'},top: {xs:'60px'},left: {xs:'5px'},zIndex: {xs:'1'},backgroundColor: theme.palette.secondary.main}}>
          <Typography
            onMouseDown={()=>{user?navigate('/'):navigate('/login')}}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block'},userSelect:'none',borderTop: `8px solid #b8f754`,borderBottom: `8px solid #4dc481`,borderRadius: '10px', marginRight: {md:"10px"}, cursor: 'pointer',fontFamily: 'Josefin Sans', width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'}, textAlign: 'center' }}
          >
            BookStore
          </Typography>
          <Typography
            onMouseDown={()=>{user?navigate('/about'):navigate('/login')}}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block'},"&:hover":{backgroundColor: {xs:'gray'}, borderRadius: {xs:'5px'}}, marginRight: {md:"10px"}, cursor: 'pointer',fontFamily: 'Josefin Sans'  , width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'} , textAlign: 'center' }}
          >
            About
          </Typography>
          <Typography
            onMouseDown={()=>{user?navigate('/contact'):navigate('/login')}}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block'},"&:hover":{backgroundColor: {xs:'gray'}, borderRadius: {xs:'5px'}}, marginRight: {md:"10px"}, cursor: 'pointer', fontFamily: 'Josefin Sans'  , width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'} , textAlign: 'center' }}
          >
            Contact
          </Typography>
          <Typography
            onMouseDown={()=>{admin?navigate('/users'):navigate('/login')}}
            variant="h6"
            noWrap

            component="div"
            sx={{ display: admin?{ xs: 'block', sm: 'block'}:'none',"&:hover":{backgroundColor: {xs:'gray'}, borderRadius: {xs:'5px'}}, marginRight: {md:"10px"}, cursor: 'pointer', fontFamily: 'Josefin Sans'  , width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'} , textAlign: 'center' }}
          >
            Users
          </Typography>
          <Typography
            onMouseDown={()=>{admin?navigate('/booklist'):navigate('/login')}}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: admin?{ xs: 'block', sm: 'block'}:'none',"&:hover":{backgroundColor: {xs:'gray'}, borderRadius: {xs:'5px'}}, marginRight: {md:"10px"}, cursor: 'pointer', fontFamily: 'Josefin Sans'  , width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'} , textAlign: 'center' }}
          >
            Books List
          </Typography>
          <Typography
            onMouseDown={()=>{admin?navigate('/category'):navigate('/login')}}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: admin?{ xs: 'block', sm: 'block'}:'none',"&:hover":{backgroundColor: {xs:'gray'}, borderRadius: {xs:'5px'}}, marginRight: {md:"10px"}, cursor: 'pointer', fontFamily: 'Josefin Sans'  , width: {xs: '100%',sm:'fit-content'}, boxSizing: {xs: 'border-box'}, padding: {xs: '5px'} , textAlign: 'center' }}
          >
            Category
          </Typography>
          </Box>
          {/* <RoutesButtonInDesktop/> */}
          <Search sx={{display: user?'block':'none'}}>
            <SearchIconWrapper>
            <SearchIcon  />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Books…"
              value={keyword}
              onChange={searchHandle}
              inputProps={{ 'aria-label': 'search' , fontFamily: 'Josefin Sans'}}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  // Perform your action here
                  const path = window.location.pathname
                  console.log(path)
                  if(window.location.pathname !== '/') {
                    navigate('/')
                  }

                  setPageIndex(1)
                  getBooks();
                  console.log("Enter key pressed");
                }}}
            />
            
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={()=>{user?navigate('/cart'):navigate('/login')}} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cart.length} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </ThemeProvider>
  );
}
