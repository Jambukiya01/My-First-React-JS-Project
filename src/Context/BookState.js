import React, { useState } from 'react'
import BookContext from './bookContext'
import axios from 'axios';
const BookState = (props) => {
    const [user,setUser] = useState("");
    const [admin,setAdmin] = useState("");
    const [users,setUsers] = useState("");
    const [cartItem,setCartItem] = useState(0);
    const [cart,setCart] = useState([]);
    const [books,setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [quantity,setQuantity] = useState();
    const [bookId,setBookId] = useState(0);
    const [keyword,setKeyword] = useState("");

    const [pageIndex,setPageIndex] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    const [pageIndexUsers,setPageIndexUsers] = useState(1);
    const [pageSizeUsers,setPageSizeUsers] = useState(20);
    const [totalPages,setTotalPages] = useState(0);

    const [totalBookListItems,setTotalBookListItems] = useState(0);
    const [bookList,setBookList] = useState(0);

    const [category,setCategory] = useState(0);
    const [totalCategory, setTotalCategory] = useState(0);

    const [loading,setLoading] = useState(false);
    const makeAddCartReq = ()=>{
      const payload = {
        "bookId": bookId,
        "userId": user.id,
        "quantity": quantity
      }
      axios.post('https://book-e-sell-node-api.vercel.app/api/cart',payload)
      .then((response)=>{
        // console.log(response)
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
      setQuantity(0)
      setBookId(0)
      handleClose()
    }
    const getCartData = ()=>{
      axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.id}` )
      .then((response)=>{

        // console.log(response) 
        setCart(response.data.result)
        return response.code
      })
      .catch((error)=>{
        return error.message
      })
    }
    const deleteFromCart = (cartId)=>{
      axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${cartId}` )
      .then((response)=>{
        // console.log(response)
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const getBooks = ()=>{
      console.log('kjdhflj')
      setLoading(true)
      const url = keyword?`https://book-e-sell-node-api.vercel.app/api/book?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`:`https://book-e-sell-node-api.vercel.app/api/book?pageSize=${pageSize}&pageIndex=${pageIndex}`
      axios.get(url)
      .then((response)=>{
        // console.log(response.data.result)
        console.log(response)
        setBooks(response.data.result.items)
        setTotalPages(response.data.result.totalPages)

        setLoading(false)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const placeOrder = ()=>{
      const cartItems = cart.map(item => item.id)
      console.log(cartItems)
      const payload = {
        userId: user.id,
        cartIds: cartItems
      }
      axios.post(`https://book-e-sell-node-api.vercel.app/api/order`, payload )
      .then((response)=>{
        console.log(response);
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const getUsers = ()=>{
      axios.get(`https://book-e-sell-node-api.vercel.app/api/user?pageSize=${pageSizeUsers}&pageIndex=${pageIndexUsers}`)
      .then((response)=>{
        console.log(response)
        setUsers(response.data.result.items)
        setTotalPages(response.data.result.totalPages)
      })
    }
    const getBookList = (pIndex,pSize)=>{
      setLoading(true)
      axios.get(`https://book-e-sell-node-api.vercel.app/api/book?pageSize=${pSize}&pageIndex=${pIndex}`)
      .then((response)=>{
        setLoading(false)
        console.log(response)
        setBookList(response.data.result.items)
        setTotalBookListItems(response.data.result.totalPages)
      })
    }
    const updateBook = (bookCredentials)=>{
      setLoading(true)
      const payload = {
        id: bookCredentials.id,
        name: bookCredentials.bookName,
        description: bookCredentials.bookDescription,
        price: bookCredentials.bookPrice,
        categoryId: bookCredentials.bookCategoryId,
        base64image: "data:image/jpeg;base64,/9j/"
      }
      axios.put(`https://book-e-sell-node-api.vercel.app/api/book`,payload)
      .then((response)=>{
        console.log(response)
        getBookList(1,10)
      })
    }
    const addBook = (bookCredentials)=>{
      setLoading(true)
      const payload = {
        name: bookCredentials.bookName,
        description: bookCredentials.bookDescription,
        price: bookCredentials.bookPrice,
        categoryId: bookCredentials.bookCategoryId,
        base64image: "data:image/jpeg;base64,/9j/"
      }
      axios.post(`https://book-e-sell-node-api.vercel.app/api/book`,payload)
      .then((response)=>{
        console.log(response)
        getBookList(1,10)
      })
    }
    const deleteBook = (bookId)=>{
      setLoading(true)
      axios.delete(`https://book-e-sell-node-api.vercel.app/api/book?id=${bookId}`)
      .then((response)=>{
        console.log(response)
        getBookList(1,10)
      })
    }
    const getCategory = (pIndex,pSize)=>{
      console.log(pIndex)
      console.log(pSize)
      setLoading(true)
      axios.get(`https://book-e-sell-node-api.vercel.app/api/category?pageSize=${pSize}&pageIndex=${pIndex}`)
      .then((response)=>{
        setLoading(false)
        console.log(response)
        setCategory(response.data.result.items)
        setTotalCategory(response.data.result.totalPages)
      })
    }
    const updateCategory = (categoryCredentials)=>{
      setLoading(true)
      const payload = {
        id: categoryCredentials.id,
        name: categoryCredentials.categoryName
      }
      axios.put(`https://book-e-sell-node-api.vercel.app/api/category`,payload)
      .then((response)=>{
        console.log(response)
        getCategory(1,10)
      })
    }
    const addCategory = (categoryCredentials)=>{
      setLoading(true)
      const payload = {
        name: categoryCredentials.categoryName,
      }
      axios.post(`https://book-e-sell-node-api.vercel.app/api/category`,payload)
      .then((response)=>{
        console.log(response)
        getCategory(1,10)
      })
    }
    const deleteCategory = (categoryId)=>{
      setLoading(true)
      axios.delete(`https://book-e-sell-node-api.vercel.app/api/category?id=${categoryId}`)
      .then((response)=>{
        console.log(response)
        getCategory(1,10)
      })
    }
  return (
    <BookContext.Provider value={{user,books,cartItem,cart,open,quantity,keyword,pageIndex,totalPages,pageSize,admin,users,pageIndexUsers,pageSizeUsers,bookList,totalBookListItems,loading,category,totalCategory, setTotalCategory,setCategory,setLoading,setTotalBookListItems,setBookList,setPageSizeUsers,setPageIndexUsers,setUsers,setAdmin,setPageSize,setTotalPages,setPageIndex,setKeyword,setQuantity, setUser,getBooks,setCartItem,setCart,setOpen,handleOpen,handleClose,makeAddCartReq,setBookId,getCartData,deleteFromCart,placeOrder,getUsers,getBookList,updateBook,addBook,deleteBook,getCategory,updateCategory,addCategory,deleteCategory}}>
        {props.children}
    </BookContext.Provider>
  );
};

export default BookState
