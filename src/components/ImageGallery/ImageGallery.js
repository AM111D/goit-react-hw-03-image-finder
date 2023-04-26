import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImagesGallery = ({ images, onClick }) => {
  const handleImageClick = largeImageURL => {
    onClick(largeImageURL);
  };

  return (
    <ul className={css.imageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            tags={image.tags}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={handleImageClick} // передайте функцию handleImageClick
          />
        );
      })}
    </ul>
  );
};

export default ImagesGallery;
