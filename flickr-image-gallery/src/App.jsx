import React, { useState } from 'react';
import axios from 'axios';

import Image from './components/Image/Image';
import Gallery from './components/Gallery/Gallery'

import styles from './App.module.scss';

function App() {
  const [images, setImages] = useState(null);
  const [gallery, setGallery] = useState([]);
  
  const [showImages ,setShowImages] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const [searchValue, setSearchValue] = useState('');
   
  function downloadImages(value) {
    axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&text=${value}&sort=relevance&safe_search=1&format=json&nojsoncallback=1`)
    .then(response => response.data)
    .then(data => {
      setImages(data.photos.photo)
    });
  };

  function handleKeyPress(e) {
    if(e.charCode === 13) {
      downloadImages(searchValue);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.buttonsContainer}>
        <input className={styles.searchInput}
               placeholder={'Type a search word'} 
               type="text" 
               onKeyPress={(e) => handleKeyPress(e)} 
               onChange={(e) => setSearchValue(e.target.value)}/>
        <button className={styles.searchButton} onClick={() => { downloadImages(searchValue); setShowImages(true); setShowGallery(false) }}>Search</button>
      </div>
      <div className={styles.galleryButtonContainer}>
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

      {showImages && <h1>Search Results</h1>}
      {showGallery && <h1>Your Gallery</h1>}
        
      <div className={styles.imageContainer}>
        {images !== null && showImages && images.map((image) => { 
          return  <Image image={image} 
                         setGallery={(gallery) => setGallery(gallery)} 
                         gallery={gallery}
                         />
        })}
      </div>
      {showGallery && <Gallery gallery={gallery}/> }
    </div>
  )
}

export default App;
