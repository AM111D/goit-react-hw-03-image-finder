import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ images }) {
  return (
    <>
      {images === null ? (
        <p>No images found</p>
      ) : (
        <>
          {images.map(image => (
            <li key={image.id} id={image.id} className={css.imageGalleryItem}>
              <a>
                <img
                  src={image.webformatURL}
                  className={css.imageGalleryItemImage}
                />
              </a>
            </li>
          ))}
        </>
      )}
    </>
  );
}

export default ImageGalleryItem;
