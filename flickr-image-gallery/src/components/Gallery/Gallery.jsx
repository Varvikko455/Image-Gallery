import React, { useState } from 'react';

import './Gallery.css';

function GalleryImage({ gallery }) {

  /* State to keep track on galleryImage position, starting with first position in array, that is zero */
  const [currentImage, setCurrentImage] = useState(0);

  /* Two functions that is setting the state of the current image showing in gallery by adding or subtracting one in the array with a condition depending on where in the array the image is */
  function nextSlide() {
    setCurrentImage(currentImage === gallery.length - 1 ? 0 : currentImage + 1);
  };
  function prevSlide() {
    setCurrentImage(currentImage === 0 ? gallery.length - 1 : currentImage - 1);
  };

  return (
    <>
      <button onClick={() => prevSlide()}>Prev</button>
      <button onClick={() => nextSlide()}>Next</button>
      <div className='galleryContainer'>
        {gallery.length === 0 && <h2>Your gallery is empty . . .</h2>}

        {gallery.map((picture, index) => { 
          return (
            <>
              {/* Checking for index position in gallery prop to be equal to the current image and show only that image */}
              {index === currentImage && 
                <img 
                  className={`galleryImage`}
                  src={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_b.jpg`} 
                  alt="" 
                />}
            </>
          )
        })} 
      </div>
    </>
  )
};

export default GalleryImage;

