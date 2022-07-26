import React, { useState } from 'react';
import'./Image.css';

function Image({ image, setGallery, gallery }) {
  /* State to keep track on user has clicked on a image or not, only used for styling */
  const [checked, setChecked] = useState(false);
  
  return (
    <div className='imageWrapper'>
      <img className={`image ${checked && 'checked'}`}
         /* On Click we send an object to the gallery state array in App.jsx with an object of server, id and secret "key" & "value"*/  
         onClick={() => { setGallery([...gallery, { server: image.server, id: image.id,
                                                    secret: image.secret                   
        }]); 
        setChecked(true); 
        }} 
         alt='' 
         src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`}/>
         {checked && <h2 className='checkedText'>Added to Gallery</h2>}  
    </div>
  )
};

export default Image;