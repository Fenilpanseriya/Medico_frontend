import React, { useRef ,useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "../../App.css"
import {FaArrowRight,FaArrowLeft} from  "react-icons/fa"
import { Text } from '@chakra-ui/react'

function DateSlider({setDate,date}) {
    const sliderRef = useRef(null)
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const generateDates = () => {
        const today = new Date()
        const endOfYear = new Date(today.getFullYear(), 11, 31)
        const dates = []

        while (today <= endOfYear) {
            dates.push(new Date(today).toDateString())
            today.setDate(today.getDate() + 1)
        }

        return dates
    }

    const dates = generateDates()

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false
                }
            },
            
        ],
        prevArrow: <FaArrowLeft  color='blue' />,
        nextArrow: <FaArrowRight  color='blue' />,
        // beforeChange: (oldIndex, newIndex) => {
        //     if ( dates[newIndex]) {
        //         alert(dates[oldIndex]);
        //         console.log(dates[oldIndex])
        //     }
        // },
        afterChange: (currentSlide) => {
            if (dates[currentSlide]) {
                
                setSelectedDateIndex(currentSlide);
                setDate(dates[currentSlide]);
            }
        },
    }

    return (
        <div style={{boxSizing:"border-box",maxWidth:"1200px",margin:"1rem auto",justifySelf:"center",justifyContent:"center"}}>
            <Slider ref={sliderRef} {...settings} >
                {dates.map((date, index) => (
                    <div key={index} className={`date-card ${selectedDateIndex===index?"selected":""}`}>
                        <Text fontSize={"1.1rem"} fontWeight={"bold"} padding={"0.25rem"}>{date}</Text>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default DateSlider