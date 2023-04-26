import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = props => {
  return (
    <li className={css.gallery_item} key={props.id} id={props.id}>
      <img
        src={props.webformatURL}
        className={css.gallery_item_image}
        onClick={() => props.onClick(props.largeImageURL)}
        alt={props.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
