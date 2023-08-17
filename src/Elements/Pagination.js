import {useContext, useEffect} from 'react';
import bookContext from '../Context/bookContext';
import { Box , Typography,Select,MenuItem, Button} from '@mui/material';
const Pagination = ()=> {
    const {user,totalBooks,totalPages,setPageSize,pageSize,setPageIndex,pageIndex,getBooks,loading,getUsers} = useContext(bookContext)
//   console.log(totalBooks)
//   console.log(totalPages)
//   console.log(pageSize)
//   console.log(pageIndex)
  const handleChange = (event)=> {
    setPageSize(event.target.value)
    setPageIndex(1)
    
  }
  const handlePageIndex = (value)=>{
    const valueL = parseInt(value, 10);
    setPageIndex(pageIndex => pageIndex + valueL)
  }
  useEffect(()=>{
    
    user && getBooks()

  },[pageIndex,pageSize])
  return (
    <Box sx={{display: loading?'none':'flex', marginTop: '20px', alignItems: 'center',justifyContent: 'center',width:'100%'}}>
        <Button onClick={()=>{handlePageIndex(-1)}} value={-1} disabled={pageIndex===1} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-left"></i></Button>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            Page Size 
        </Typography>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSize}
            label="PageSize"
            onChange={handleChange}
            sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}
            
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            {pageIndex} of {totalPages}
        </Typography>
        <Button onClick={()=>{handlePageIndex(1)}} value={1} disabled={pageIndex===totalPages} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-right"></i></Button>
    </Box>
  );
}
export default Pagination