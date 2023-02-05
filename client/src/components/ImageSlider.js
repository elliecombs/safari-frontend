import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css"
import React from 'react'

const images = [{
    id: 1,
    src: "Safari/client/IMG_4234",
    alt: "Image 1"
},
{
    id: 2,
    src: "Safari/client/IMG_4588",
    alt: "Image 2 "
},
{
    id: 3,
    src: "Safari/client/IMG_4600",
    alt: "Image 3"
}
];

const ImageSlider = ({images}) => {
    console.log('=====images', images)
const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    // autoplay: true,
    autoplaySpeed: 2000,
};
    return (
    <>
    <div className="tag">
        <h1>Welcome!</h1>
    </div>
        <div className="imgslider">
            {/* Slider maps through each image above */}
            <Slider {...settings} >
                {images.map((item) => {
                    console.log(item)
                    return (  
                        <div className="align-item-centered" key={item.id}>
                            <img style={{width:'300px'}} src={item.src}  alt={item.alt} />
                        </div>
                    )
                })}
            </Slider>
    </div>
        </>
    )
}
export default ImageSlider;