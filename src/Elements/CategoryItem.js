import React, { useContext } from 'react'
import bookContext from '../Context/bookContext';
import { Button,TableRow,TableCell } from '@mui/material';
import { toast } from 'react-toastify';
const CategoryItem = (props) => {
    const {deleteCategory} = useContext(bookContext)
    const {categoryItem, index,handleOpen, setCategoryCredentials,categoryCredentials,setCredentials,credentials} = props;
    const editCategory = ()=>{
      setCategoryCredentials({...categoryCredentials,id: categoryItem.id, categoryName: categoryItem.name})
      handleOpen()
    }
    const removeCategory = ()=>{
      setCredentials({...credentials, pageIndex : 1, pageSize : 10})
      deleteCategory(categoryItem.id)
      toast.success('Removed Category')
    }
  return (
    <TableRow
        key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } , fontSize: {xs: '2rem'}}}>
        <TableCell component="th" scope="row" align='center'>
            {index+1}
        </TableCell>
        <TableCell align="center">{categoryItem.name}</TableCell>
        <TableCell align="center">{categoryItem.id}</TableCell>
        <TableCell align="center">
          <Button id={`${categoryItem.index}-editButton`} sx={{marginRight: {xs: '0',lg:'10px'},marginBottom: {xs: '10px',lg:'0'}}} variant='outlined' onClick={editCategory}>Edit</Button>
          <Button id={`${categoryItem.index}-removeButton`} sx={{marginLeft: {xs: '0',lg:'10px'}}} variant='outlined' onClick={removeCategory}>Remove</Button>
        </TableCell>
    </TableRow>
  )
}

export default CategoryItem
