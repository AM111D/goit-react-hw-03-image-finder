import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  console.log(props.tags);
  return (
    <li className={css.gallery_item} key={props.id} id={props.id}>
      <a>
        <img src={props.webformatURL} className={css.gallery_item_image} />
      </a>
    </li>
  );
};

export default ImageGalleryItem;
