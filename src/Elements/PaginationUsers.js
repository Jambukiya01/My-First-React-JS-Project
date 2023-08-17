import {useContext, useEffect} from 'react';
import bookContext from '../Context/bookContext';
import { Box , Typography,Select,MenuItem, Button} from '@mui/material';
const PaginationUsers = ()=> {
    const {admin,totalPages,setPageSizeUsers,pageSizeUsers,setPageIndexUsers,pageIndexUsers,loading,getUsers} = useContext(bookContext)

  const handleChange = (event)=> {
    setPageSizeUsers(event.target.value)
    setPageIndexUsers(1)
    
  }
  const handlePageIndex = (value)=>{
    const valueL = parseInt(value, 10);
    setPageIndexUsers(pageIndexUsers => pageIndexUsers + valueL)
  }
  useEffect(()=>{
    admin && getUsers()
  },[pageIndexUsers,pageSizeUsers])
  return (
    <Box sx={{display: loading?'none':'flex', marginTop: '20px',marginBottom: '30px', alignItems: 'center',justifyContent: 'center',width:'100%'}}>
        <Button onClick={()=>{handlePageIndex(-1)}} value={-1} disabled={pageIndexUsers===1} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-left"></i></Button>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            Page Size 
        </Typography>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSizeUsers}
            label="PageSize"
            onChange={handleChange}
            sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}
            
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
        <Typography sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}>
            {pageIndexUsers} of {totalPages}
        </Typography>
        <Button onClick={()=>{handlePageIndex(1)}} value={1} disabled={pageIndexUsers===totalPages} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-right"></i></Button>
    </Box>
  );
}
export default PaginationUsers