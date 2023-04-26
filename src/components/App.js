import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import FetchImageApi from 'services/image-api';
import ImagesLoader from './Loader/Loader';
import ImageSearchError from './ImagesError/ImagesError';
import ImagesGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/ButtonLoadMore';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    imagesName: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    loading: false,
    isButtonDisabled: true,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imagesName !== this.state.imagesName) {
      this.getImages();
    }
  }

  handleFormSubmit = imagesName => {
    console.log(imagesName);
    this.setState({ imagesName });
  };

  getImages = async () => {
    this.setState({ status: 'pending', loading: true });
    try {
      const images = await FetchImageApi(this.state.imagesName);
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
  };

  loadMoreImages = async () => {
    try {
      const newImages = await FetchImageApi(
        this.state.imagesName,
        this.state.page + 1
      );

      const allImages = [...this.state.images, ...newImages];
      this.setState({
        images: allImages,
        status: 'resolve',
        page: this.state.page + 1,
      });
    } catch (error) {}
  };

  handleOpenModal = largeImageURL => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, status, isButtonDisabled, showModal } = this.state;

    if (status === 'pending') {
      return <ImagesLoader />;
    }
    if (status === 'rejected') {
      return <ImageSearchError message={error.message} />;
    }
    if (status === 'resolve') {
      if (images.length === 0) {
        return <p>По запросу "{this.state.imagesName}" ничего не найдено</p>;
      }
    }

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImagesGallery images={images} onClick={this.handleOpenModal} />

        {!isButtonDisabled && (
          <ButtonLoadMore
            loadMoreImages={this.loadMoreImages}
            disabled={isButtonDisabled}
          />
        )}

        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            images={this.state.images}
            onClick={this.handleCloseModal}
            selectedImage={this.state.selectedImage}
          />
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
