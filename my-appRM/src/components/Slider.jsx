import React, { useEffect, useState } from 'react';
import { fetchSliderImages } from '../api/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import '../styles/Slider.css'; // Import custom CSS for slider

const FrontendSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  let sliderRef = React.createRef(); // Create a ref for the slider

  useEffect(() => {
    loadSliderImages();
  }, []);

  const loadSliderImages = async () => {
    try {
      const response = await fetchSliderImages();
      setSliderImages(response.data); // Set fetched images in state
    } catch (err) {
      console.error('Error fetching slider images', err);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable default arrows to use custom buttons
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <div className="slider-container">
      {sliderImages.length > 0 ? (
        <>
          <Slider {...settings} ref={sliderRef}>
            {sliderImages.map((slider) => (
              <div key={slider._id} className="slider-item">
                <img
                  src={slider.imageUrl} // Directly use the Cloudinary image URL
                  alt="Slider"
                  className="slider-image"
                />
              </div>
            ))}
          </Slider>

          {/* Custom Navigation Buttons */}
          <button 
            className="custom-prev" 
            onClick={() => sliderRef.current.slickPrev()}>
            &#8249;
          </button>
          <button 
            className="custom-next" 
            onClick={() => sliderRef.current.slickNext()}>
            &#8250;
          </button>
        </>
      ) : (
        <p>Loading Please Wait</p>
      )}
    </div>
  );
};

export default FrontendSlider;
