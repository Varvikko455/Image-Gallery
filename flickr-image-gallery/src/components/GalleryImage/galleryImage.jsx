import React from 'react'

function galleryImage({ picture }) {
  return (
    <div className='galleryContainer'>
      <img src={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_b.jpg`} alt="" />
    </div>
  )
}

export default galleryImage