import React, { Component } from 'react';
import ImageSearchError from 'components/ImagesError/ImagesError';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ImagesLoader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import FetchImageApi from '../../services/image-api';
import LoadMoreBtn from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    loading: false,
    isButtonDisabled: true,
    showModal: false,
  };
  async componentDidUpdate(prevProps) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending', loading: true }); // устанавливаем loading в true
      try {
        const images = await FetchImageApi(nextName);
        console.log(images);
        if (images.length < 12) {
          this.setState({
            images,
            status: 'resolve',
            isButtonDisabled: true,
          });
        } else {
          this.setState({
            images,
            status: 'resolve',
            isButtonDisabled: false,
          });
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  loadMoreImages = async () => {
    const { images, page } = this.state;
    const { imagesName } = this.props;
    this.setState({ loading: true });
    try {
      const newImages = await FetchImageApi(imagesName, page + 1);

      if (newImages.length === 0) {
        this.setState({
          loading: false,
        });
        return;
      }
      const allImages = [...images, ...newImages];
      this.setState({
        images: allImages,
        status: 'resolve',
        page: page + 1,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { images, error, status, loading, isButtonDisabled, showModal } =
      this.state;
    const { imagesName } = this.props;

    if (status === 'pending') {
      return <ImagesLoader />;
    }

    if (status === 'rejected') {
      return <ImageSearchError message={error.message} />;
    }

    if (status === 'resolve') {
      if (images.length === 0) {
        return (
          <p className={css.noSearch}>
            По запросу "{imagesName}" ничего не найдено
          </p>
        );
      }

      return (
        <div>
          <button type="button" onClick={this.toggleModal}>
            open modal
          </button>
          {showModal && (
            <Modal>
              <img src="../../../assets/deploy-status.png" />
            </Modal>
          )}
          <ul className={css.imageGallery}>
            <ImageGalleryItem images={images} />
          </ul>
          <LoadMoreBtn page={this.loadMoreImages} disabled={isButtonDisabled} />
        </div>
      );
    }
  }
}

export default ImageGallery;
