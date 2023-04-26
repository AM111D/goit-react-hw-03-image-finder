import css from './Modal.module.css';
import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  render() {
    const { images, selectedImage, onClose } = this.props;
    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={selectedImage} alt={images.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

// const Modal = ({ handleCloseModal, selectedImage }) => {
//   return (
//     <div className={css.overlay} onClick={handleCloseModal}>
//       <div className={css.modal}>
//         <img src={selectedImage} alt="" />
//       </div>
//     </div>
//   );
// };

// export default Modal;
