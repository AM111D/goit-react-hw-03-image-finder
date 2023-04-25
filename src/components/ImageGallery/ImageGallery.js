import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImagesGallery = ({ images }) => {
  console.log(images);

  return (
    <ul className={css.imageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            tags={image.tags}
            webformatURL={image.webformatURL}
          />
        );
      })}
    </ul>
  );
};

export default ImagesGallery;
