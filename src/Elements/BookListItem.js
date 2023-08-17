import React, { useContext } from 'react'
import bookContext from '../Context/bookContext';
import { Button,TableRow,TableCell } from '@mui/material';
import { toast } from 'react-toastify';
const BookListItem = (props) => {
    const {deleteBook} = useContext(bookContext)
    const {bookListItem, index,handleOpen, setBookCredentials,bookCredentials,setCredentials,credentials} = props;
    const editBook = ()=>{
      setBookCredentials({...bookCredentials,id: bookListItem.id, bookName: bookListItem.name, bookDescription: bookListItem.description, bookCategoryId: bookListItem.categoryId, bookPrice: bookListItem.price})
      handleOpen()
    }
    const removeBook = ()=>{
      setCredentials({...credentials, pageIndex : 1, pageSize : 10})
      deleteBook(bookListItem.id)
      toast.success("Book Removed")
    }
  return (
    <TableRow
        key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } , fontSize: {xs: '2rem'}}}>
        <TableCell component="th" scope="row">
            {index+1}
        </TableCell>
        <TableCell align="center">{bookListItem.name}</TableCell>
        <TableCell align="center">{bookListItem.category}</TableCell>
        <TableCell align="center" sx={{width: '500px'}}>{bookListItem.description}</TableCell>
        <TableCell align="center">{bookListItem.price}</TableCell>
        <TableCell align="center">
          <Button id={`${bookListItem.index}-editButton`} sx={{marginRight: {xs: '0',lg:'10px'},marginBottom: {xs: '10px',lg:'0'}}} variant='outlined' onClick={editBook}>Edit</Button>
          <Button id={`${bookListItem.index}-removeButton`} sx={{marginLeft: {xs: '0',lg:'10px'}}} variant='outlined' onClick={removeBook}>Remove</Button>
        </TableCell>
    </TableRow>
  )
}

export default BookListItem
