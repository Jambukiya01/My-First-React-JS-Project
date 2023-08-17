import React, {useContext,useEffect} from 'react'
import bookContext from '../Context/bookContext';
const About = () => {
    const {user, navigate} = useContext(bookContext);
    useEffect(()=>{
      if(!user) {
        navigate('/login')
      }
    })
  return (
    <div>
      About
    </div>
  )
}

export default About
