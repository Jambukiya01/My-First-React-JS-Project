import React, {useContext,useEffect} from 'react'
import bookContext from '../Context/bookContext';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
    const {user} = useContext(bookContext);
    const navigate = useNavigate();
    useEffect(()=>{
      if(!user) {
        navigate('/login')
      }
    })
  return (
    <div>
      Contact
    </div>
  )
}

export default Contact
