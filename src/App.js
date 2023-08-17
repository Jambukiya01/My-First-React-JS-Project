import './App.css';
import Navbar from './Elements/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Elements/Login';
import Home from './Elements/Home';
import Signup from './Elements/Signup';
import { ToastContainer } from 'react-toastify';
import About from './Elements/About';
import Contact from './Elements/Contact';
import 'react-toastify/dist/ReactToastify.css';
import BookState from './Context/BookState';
import Footer from './Elements/Footer';
import Cart from './Elements/Cart';
import Users from './Elements/Users';
import BookList from './Elements/BookList';
import Category from './Elements/Category';
function App() {
  document.getElementById('root').style.fontFamily = "Josefin Sans"
  return (
    <div id='mainDiv'>
      <BookState>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/contact' element={<Contact/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
            <Route exact path='/users' element={<Users/>}/>
            <Route exact path='/bookList' element={<BookList/>}/>
            <Route exact path='/category' element={<Category/>}/>
          </Routes>
          <Footer/>
          <ToastContainer/>
        </BrowserRouter>
      </BookState>
    </div>
  );
}

export default App;
