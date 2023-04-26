import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

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
            tags={image.tags}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={handleImageClick} //
          />
        );
      })}
    </ul>
  );
};

export default ImagesGallery;

ImagesGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
