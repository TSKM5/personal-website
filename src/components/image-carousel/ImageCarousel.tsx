import { useState, useEffect } from 'react';
import './../../css/components/image-carousel/image-carousel.css';
import IconButton from '../action-components/IconButton';
import FocusedImage from './FocusedImage';

export default function ImageCarousel(props: { images: string[] }) {
    const { images } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [enlargeImage, setEnlargeImage] = useState<boolean>(false);
    const [imageEles, setImageEles] = useState<JSX.Element[]>([]);

    useEffect(() => {
        let loadedCount = 0;
        const tempImageEles: JSX.Element[] = [];
    
        images.forEach((image, index) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                tempImageEles.push(
                    <img
                        key={index}
                        className='image-carousel-content-image'
                        src={image}
                        alt={`carousel image ${index}`}
                        onClick={() => onImageClick()}
                    />
                );

                if (loadedCount === images.length) {
                    setImageEles(tempImageEles);
                }
            };
            img.onerror = () => {
                loadedCount++;
                tempImageEles.push(
                    <div className='image-carousel-content-error-image-container' key={index}>
                        <img className='image-carousel-content-error-image' src={require('./../../assets/error.svg').default} />
                        <p className='image-carousel-content-error-text'>Image failed to load.<br/>Please ensure adblock is not blocking the image.</p>
                    </div>
                );
                
                if (loadedCount === images.length) {
                    setImageEles(tempImageEles);
                }
            }
            img.src = image;
        });
    }, [images]);
    
    if (!images || images.length === 0) return null;

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? imageEles.length - 1 : prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === imageEles.length - 1 ? 0 : prevIndex + 1);
    };

    const onImageClick = () => {
        setEnlargeImage(!enlargeImage);
    };

    return (
        <div className='image-carousel-container'>
            <IconButton classOverride='image-carousel-button-left' asset={require('./../../assets/arrow-up.svg')} callback={handlePrevious} />
            <div className='image-carousel-content-container'>
                <div className='image-carousel-image-container'>
                    {imageEles.length >= currentIndex ? imageEles[currentIndex] : <></>}
                </div>
                <div className='image-carousel-tracker-container'>
                    {imageEles.map((_, index) => (
                        <div className={`image-carousel-tracker-${currentIndex === index ? 'selected' : 'unselected'}`} key={index} />
                    ))}
                </div>
            </div>
            <IconButton classOverride='image-carousel-button-right' asset={require('./../../assets/arrow-up.svg')} callback={handleNext} />
            {enlargeImage && <FocusedImage src={imageEles[currentIndex].props.src} onClick={onImageClick} />}
        </div>
    );
}
