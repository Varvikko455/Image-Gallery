import React, { useState } from 'react';
import axios from 'axios';

import Image from './components/Image/Image';
import Gallery from './components/Gallery/Gallery'

import styles from './App.module.scss';

function App() {
  /* States for data to be used in images and gallery images */
  const [images, setImages] = useState(null);
  const [gallery, setGallery] = useState([]);
  
  /* States for conditions */
  const [showImages ,setShowImages] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  /* State for string search value */
  const [searchValue, setSearchValue] = useState('');
  
  /* Function that gets flickr api with a search value, search value is dynamic in this case and sets a state array with the data */
  function downloadImages(value) {
    axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&text=${value}&sort=relevance&safe_search=1&format=json&nojsoncallback=1`)
    .then(response => response.data)
    .then(data => {
      setImages(data.photos.photo)
    });
  };

  /* Function to check if the user has pressed Enter, if so activate downloadImages function to show images with the search value*/
  function handleKeyPress(e) {
    if(e.charCode === 13) {
      downloadImages(searchValue);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.buttonsContainer}>
        {/* Input field with an onChange to catch each character the user enters in a state specified as a string */}
        <input className={styles.searchInput}
               placeholder={'Type a search word'} 
               type="text" 
               onKeyPress={(e) => handleKeyPress(e)} 
               onChange={(e) => setSearchValue(e.target.value)}/>
        {/* Button with an onClick to activate downloadImages with search value, change show images state to true and change show gallery to false */}       
        <button className={styles.searchButton} onClick={() => { downloadImages(searchValue); setShowImages(true); setShowGallery(false) }}>Search</button>
      </div>
      <div className={styles.galleryButtonContainer}>
        {/* Condition to alternate between show and hide the gallery and images */}
        {showGallery ? 
        <button className={styles.galleryButton} 
          onClick={() =>{ setShowGallery(false); setShowImages(true)}}>
            Hide Gallery
        </button>
        :
        <button className={styles.galleryButton} 
          onClick={() =>{ setShowGallery(true); setShowImages(false)}}>
            Show Gallery
        </button>
        }
      </div>

      {/* Diffrent titles based on what has been clicked on */}  
      {showImages && <h1>Search Results</h1>}
      {showGallery && <h1>Your Gallery</h1>}
        
      <div className={styles.imageContainer}>
        {/* Condition to map images when it's not equal to null and state is true */}
        {images !== null && showImages && images.map((image, key) => { 
          return  <Image image={image} 
                         setGallery={(gallery) => setGallery(gallery)} 
                         gallery={gallery}
                         key={key}
                         />
        })}
      </div>
      {/* Condition to show gallery when state is true */}
      {showGallery && <Gallery gallery={gallery}/> }
    </div>
  )
}

export default App;
