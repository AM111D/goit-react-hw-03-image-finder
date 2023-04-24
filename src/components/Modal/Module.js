import css from './Modal.module.css';

function ModalOpenImages(params) {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}></div>
    </div>
  );
}

export default ModalOpenImages;
