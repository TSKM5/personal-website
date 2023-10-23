import './../css/components/image-carousel.css';
import React, { useEffect, useState } from 'react';
import IconButton from './action-components/IconButton';
import { sanityImageBuilder } from '../services/cms-service/SanityService';
import { ImageItem } from '../utils/types/sanity-types/SanityImageTypes';
import FocusedImage from './FocusedImage';

const ImageCarousel = (props: { images: string[] }) => {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [enlargeImage, setEnlargeImage] = useState<boolean>(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImage(images[currentIndex]);
    }
  }, [currentIndex, images]);

  if (!images || images.length === 0) return (<></>);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const onImageClick = () => {
    setEnlargeImage(!enlargeImage);
  };

  return (
    <div className='image-carousel-container'>
      <IconButton classOverride='image-carousel-button-left' asset={require('./../assets/arrow-up.svg')} callback={handlePrevious} />
      <div className="image-carousel-prev" onClick={handlePrevious}>
        <img src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} alt="Previous Image" />
      </div>
      <div className='image-carousel-content-container'>
        <div className='image-carousel-content-image-container'>
          <img className='image-carousel-content-image' src={currentImage} alt="carousel" onClick={() => onImageClick()} />
        </div>
        <div className='image-carousel-tracker-container'>
          {
            Array.from({ length: images.length }).map((i, index) => (
              <div className={`image-carousel-tracker-${currentIndex === index ? 'selected' : 'unselected'}`} key={index} />
            ))
          }
        </div>
      </div>
      <div className="image-carousel-next" onClick={handleNext}>
        <img src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} alt="Next Image" />
      </div>
      <IconButton classOverride='image-carousel-button-right' asset={require('./../assets/arrow-up.svg')} callback={handleNext} />
      {
        enlargeImage && (
          <FocusedImage src={currentImage} onClick={onImageClick} />
        )
      }
    </div>
  );
};

export default ImageCarousel;
