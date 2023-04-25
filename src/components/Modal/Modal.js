import css from './Modal.module.css';

const Modal = props => {
  return (
    <div className={css.overlay} onClick={this.props.onClick}>
      <div className={css.modal}>
        <img src={this.props.images} />
      </div>
    </div>
  );
};

export default Modal;

// import * as basicLightbox from 'basiclightbox';

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `);

// instance.show();
