import {useContext, useEffect, useState} from 'react';
import bookContext from '../Context/bookContext';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Typography,Select,MenuItem,Modal,TextField } from '@mui/material';
import CategoryItem from './CategoryItem';
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
const Category=()=> {
    const {getCategory,admin,totalCategory,loading,category,updateCategory,addCategory} =useContext(bookContext)
    const  [credentials, setCredentials] = useState({
      pageIndex : 1,
      pageSize : 10
    })
    const [categoryCredentials,setCategoryCredentials] = useState({
      categoryName : "",
      id: 0,
    })
    const [categoryOpen,setCategoryOpen] = useState(false)
    const handleOpen = () => setCategoryOpen(true);
    const handleClose = () => setCategoryOpen(false);
    const handlePageIndex =(value)=>{
      setCredentials({...credentials, pageIndex: credentials.pageIndex+value})
    }
    const handleChange = (event)=> {

      setCredentials({...credentials, pageSize: event.target.value,pageIndex: 1})
    }
    
    const categoryRequest = ()=>{
      console.log(categoryCredentials.categoryName)
      console.log(categoryCredentials.id)
      if(categoryCredentials.id===0) {
        addCategory(categoryCredentials)
        toast.success('Added Category')
      }
      else {
        updateCategory(categoryCredentials)
        setCredentials({...credentials, pageIndex : 1, pageSize : 10})
        toast.success('Updated Category')
      }
      handleClose()
    }
    const addCategoryFun = ()=>{
      setCategoryCredentials({...categoryCredentials,id:'', categoryName: "", id: 0})
      handleOpen()
    }
    const navigate = useNavigate();
    useEffect(()=>{
        if(admin) {
            console.log("admin yes")
            getCategory(credentials.pageIndex,credentials.pageSize)
        }
        else {
            console.log("admin No")
            navigate("/login")
        }
        // eslint-disable-next-line
    },[credentials])
  return (
    <Box sx={{minHeight: '100vh', width: '90vw', display: 'flex',alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>
      <Typography variant='h3' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',width:'100%',backgroundColor: theme.palette.secondary.light, textAlign: 'center', margin: '10px 0px',padding: '5px', borderRadius: '10px',boxSizing: 'border-box', fontSize: '2.5rem'}}>
          Category
          <Button variant='outlined' onClick={addCategoryFun}  sx={{width: 'fit-content',position: 'absolute', right: '0',color: theme.palette.secondary.dark}} >Add New Category</Button> 
        </Typography>
      <TableContainer sx={{"&::-webkit-scrollbar":{display: 'none'}, width: '99%',height: '100%'}} component={Paper}>
        <Table sx={{ minWidth: 400}  } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{fontWeight: '900'}}>Sr. No</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Category Name</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Category Id</TableCell>
              <TableCell align="center" sx={{fontWeight: '900'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category && category.map((categoryItem,index) => (
              <CategoryItem categoryItem={categoryItem} index={index} setCategoryCredentials={setCategoryCredentials} categoryCredentials={categoryCredentials} handleOpen={handleOpen} setCredentials={setCredentials} credentials={credentials}/>
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
            {credentials.pageIndex} of {totalCategory}
        </Typography>
        <Button onClick={()=>{handlePageIndex(1)}} value={1} disabled={credentials.pageIndex===totalCategory} sx={{fontFamily: 'Josefin Sans',marginRight: '10px'}}><i className="fa-solid fa-angle-right"></i></Button>
    </Box>
    <Modal
        open={categoryOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Category Name
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="categoryName"
              name="categoryName"
              value={categoryCredentials.categoryName}
              onChange={(e) =>{
                setCategoryCredentials({...categoryCredentials, categoryName :e.target.value })
              }}
            />
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Category Id
            </Typography>
            <TextField
              fullWidth
              sx={{marginTop: "20px", fontFamily: 'Josefin Sans'}}
              id="categoryId"
              name="categoryId"
              value={categoryCredentials.id}
              onChange={(e) =>{
                setCategoryCredentials({...categoryCredentials, id :e.target.value })
              }}
            /> */}
          <Button onClick={()=>categoryRequest()} sx={{marginTop: "20px",fontFamily: 'Josefin Sans'}} color="secondary" variant="contained" type="submit">
            Submit
          </Button>
          </Box>
        </Modal>
    </Box>
  );
}

export default Category;