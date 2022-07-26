import React, { useState } from 'react';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md';

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
    
      <div className='galleryContainer'>
        {/* Condition if the array is empty show this message */}
        {gallery.length === 0 && <h2>Your gallery is empty . . .</h2>}

        {/* Condition for buttons if gallery array is empty, do not show buttons*/}
        {gallery.length !== 0 && (
          <>
            <MdOutlineArrowBackIosNew className={`button left`} onClick={() => prevSlide()} />
            <MdOutlineArrowForwardIos className={`button right`} onClick={() => nextSlide()} />
          </>
        )}

        {/* Mapping out array from gallery props and uses the data to fill source in each gallery image with a larger resolution */}
        {gallery.map((picture, index) => { 
          return (
            <>
              {/* Condition to add class name active for trandition effect when index is equal to the current image */}
              <div className={`slider ${index === currentImage ? 'active' : ''}`}>
              {/* Checking for index position in gallery prop to be equal to the current image and show only that image */}
                {index === currentImage &&
                  <img 
                    className={`galleryImage`}
                    src={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_b.jpg`} 
                    alt="" 
                  />}
              </div> 
            </>
          )
        })} 
      </div>
    
  )
};

export default GalleryImage;

