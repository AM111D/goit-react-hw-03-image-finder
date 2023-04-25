import React, { Component } from 'react';
import ImageSearchError from 'components/ImagesError/ImagesError';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ImagesLoader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import FetchImageApi from '../../services/image-api';
import LoadMoreBtn from 'components/Button/Button';
import ModalOpenImages from 'components/Modal/Modal';

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
  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    const { page } = this.state;
    if (prevName !== nextName) {
      this.setState({ status: 'pending', loading: true }); // устанавливаем loading в true
      try {
        const images = await FetchImageApi(nextName);
        console.log(images);
        this.setState({
          images,
          status: 'resolve',
          page: 1,
          isButtonDisabled: false,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMoreImages = async () => {
    const { images, page } = this.state;
    const { imagesName } = this.props;
    this.setState({ loading: true });
    try {
      const newImages = await FetchImageApi(imagesName, page + 1);
      if (newImages.length === 0) {
        this.setState({
          isButtonDisabled: false,
          loading: false,
        });
        return;
      }
      const allImages = [...images, ...newImages];
      this.setState({
        images: allImages,
        status: 'resolve',
        page: page + 1,
        isButtonDisabled: allImages.length === FetchImageApi.totalImages,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    } finally {
      this.setState({ loading: false });
    }
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
          {console.log(isButtonDisabled)}
          <ul className={css.imageGallery}>
            <ImageGalleryItem images={images} />
            {/* {showModal && <ModalOpenImages />} */}
            <ModalOpenImages />
          </ul>
          <LoadMoreBtn page={this.loadMoreImages} disabled={isButtonDisabled} />
        </div>
      );
    }
  }
}

export default ImageGallery;
