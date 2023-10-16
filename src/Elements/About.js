import React, {useContext,useEffect} from 'react'
import bookContext from '../Context/bookContext';
import './About.css'

const About = () => {
    const {user, navigate} = useContext(bookContext);
    useEffect(()=>{
      if(!user) {
        navigate('/login')
      }
    },[user, navigate])
  return (
    <div>
    <section className="about_section layout_padding">
    <div className="container ">
      <div className="row">
        <div className="col-md-6">
          <div className="img-box">
          <img src={require('./about-img.png')} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                About Our Bookstore
              </h2>
            </div>
            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet erat nullam tortor quis elit lacus
  blandit vitae. Nostra dapibus bibendum; curae magnis commodo metus vestibulum tristique. Tristique
  volutpat consectetur congue lorem pharetra habitant. Sodales gravida egestas venenatis dignissim
  molestie cursus porta. Massa lacus pulvinar aliquam mi tristique
            </p>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default About
