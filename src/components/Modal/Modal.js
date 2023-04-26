import css from './Modal.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      selectedImage: PropTypes.string,
    })
  ),
  onClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.string,
};
