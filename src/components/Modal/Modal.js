import css from './Modal.module.css';
import * as basicLightbox from 'basiclightbox';

function ModalOpenImages() {
  const instance = basicLightbox.create(`
    <div class="modal">
      <p>
        qw
      </p>
    </div>
  `);

  instance.show();

  //   return null;
}

export default ModalOpenImages;
