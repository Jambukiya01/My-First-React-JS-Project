import {useContext, useEffect, useState} from 'react';
import bookContext from '../Context/bookContext';
import { useNavigate } from 'react-router-dom';
import BookListItem from './BookListItem';
import theme from '../styles/theme';
import { Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Typography,Select,MenuItem,Modal,TextField } from '@mui/material';
import { toast } from 'react-toastify';
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
const BookList=()=> {
    const {getBookList,admin,totalBookListItems,loading,bookList,updateBook,addBook} =useContext(bookContext)
    const  [credentials, setCredentials] = useState({
      pageIndex : 1,
      pageSize : 10
    })
    const [bookCredentials,setBookCredentials] = useState({
      bookName : "",
      bookDescription: "",
      bookCategoryId: 0,
      bookPrice: 0,
      id: 0,
      base64image: "data:image/jpeg;base64,/9j/"
    })
    const [bookOpen,setBookOpen] = useState(false)
    const handleOpen = () => setBookOpen(true);
    const handleClose = () => setBookOpen(false);
    const handlePageIndex =(value)=>{
      setCredentials({...credentials, pageIndex: credentials.pageIndex+value})
    }
    const handleChange = (event)=> {

      setCredentials({...credentials, pageSize: event.target.value,pageIndex: 1})
    }
    
    const editBookRequest = ()=>{

      if(bookCredentials.id==='') {
        addBook(bookCredentials)
        toast.success("Book Added")
      }
      else {
        updateBook(bookCredentials)
        setCredentials({...credentials, pageIndex : 1, pageSize : 10})
        toast.success("Book Updated")
      }
      handleClose()
    }
    const addBookFun = ()=>{
      setBookCredentials({...bookCredentials,id:'', bookName: "", bookDescription: "", bookCategoryId: 0, bookPrice: 0})
      handleOpen()
    }
    const navigate = useNavigate();
    useEffect(()=>{
        if(admin)
        getBookList(credentials.pageIndex,credentials.pageSize)
        else
        navigate("/login")
    },[credentials])
  return (
    <Box sx={{minHeight: '100vh', width: '90vw', display: 'flex',alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>
      <Typography variant='h3' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',width:'100%',backgroundColor: theme.palette.secondary.light, textAlign: 'center', margin: '10px 0px',padding: '5px', borderRadius: '10px',boxSizing: 'border-box', fontSize: '2.5rem'}}>
          BookList
        <Button variant='outlined' onClick={addBookFun}  sx={{width: 'fit-content',position: 'absolute', right: '0',color: theme.palette.secondary.dark}}>Add New Book</Button> 
      </Typography>
      <TableContainer sx={{"&::-webkit-scrollbar":{display: 'none'}, width: '99%',height: '100%'}} component={Paper}>
        <Table sx={{ minWidth: 400}  } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{fontWeight: '900'}}>Sr. No</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Book Name</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Category</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Description</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Price(₹)</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList && bookList.map((bookListItem,index) => (
              <BookListItem bookListItem={bookListItem} index={index} setBookCredentials={setBookCredentials} bookCredentials={bookCredentials} handleOpen={handleOpen} setCredentials={setCredentials} credentials={credentials}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display: loading?'none':'flex', marginTop: '20px',marginBottom: '30px', alignItems: 'center',justifyContent: 'center',width:'100%'}}>
        <Button onClick={()=>{handlePageIndex(-1)}} value={-1} disabled={credentials.pageIndex===1} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-left"></i></Button>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            Page Size 
        </Typography>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={credentials.pageSize}
            label="PageSize"
            onChange={handleChange}
            sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}
            
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            {credentials.pageIndex} of {totalBookListItems}
        </Typography>
        <Button onClick={()=>{handlePageIndex(1)}} value={1} disabled={credentials.pageIndex===totalBookListItems} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-right"></i></Button>
    </Box>
    <Modal
        open={bookOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Name
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="bookName"
              name="bookName"
              // label="bookName*"
              value={bookCredentials.bookName}
              onChange={(e) =>{
                setBookCredentials({...bookCredentials, bookName :e.target.value })
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Description
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="bookDescription"
              name="bookDescription"
              // label="bookDescription*"
              value={bookCredentials.bookDescription}
              onChange={(e) =>{
                setBookCredentials({...bookCredentials, bookDescription :e.target.value })
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Category ID
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="bookCategoryId"
              name="bookCategoryId"
              // label="bookCategoryId*"
              value={bookCredentials.bookCategoryId}
              onChange={(e) =>{
                setBookCredentials({...bookCredentials, bookCategoryId :e.target.value })
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Price
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="bookPrice"
              name="bookPrice"
              // label="bookPrice*"
              value={bookCredentials.bookPrice}
              onChange={(e) =>{
                setBookCredentials({...bookCredentials, bookPrice :e.target.value })
              }}
            />
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Base 64 Image
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="base64"
              name="base64"
              value={""}
              onChange={(e) =>{
                base64Img.requestBase64(e.target.value, function(err, res, body) {
  
                  setBookCredentials({...bookCredentials, base64image :res })
                });
              }}
            /> */}
          <Button onClick={()=>editBookRequest()} sx={{marginTop: "20px",fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
            Submit
          </Button>
          </Box>
        </Modal>
    </Box>
  );
}

export default BookList;