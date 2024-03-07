import React from 'react'
import { Zoom} from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../assets/banner2.webp"
import banner2 from "../../assets/banner3.jpg"
import banner3 from "../../assets/banner4.webp"

const Banner = () => {
    const images=[banner1,banner2,banner3]
    const zoomOutProperties = {
        duration: 3500,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true,
      };
  return (
    <div className="slide-container" style={{width:"100%",marginTop:"3rem"}}>
      <Zoom {...zoomOutProperties} scale={1.2} >
        {images.map((each, index) => (
          <img key={index} style={{ width: "100%",height:"60vh" }} src={each} className='img'/>
        ))}
      </Zoom>
    </div>
  )
}

export default Banner