import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=25187003-ac92f0861cd819d45c4ecbcb8&q=${nextName}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`нет картинокс именем ${nextName}`));
        })
        .then(images =>
          this.setState({ images: images.hits, status: 'resolve' })
        )
        .catch(error => this.setState({ error, status: 'reejecteds' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, loading, error, status } = this.state;
    const { imagesName } = this.props;

    if (status === 'idle') {
      return <div>Введите имя для поиска</div>;
    }

    if (status === 'pending') {
      return <div>Loading....</div>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolve') {
      <div>
        {images.map(image => (
          <img key={image.id} src={image.previewURL} alt={image.tags} />
        ))}
      </div>;
    }

    return (
      <div>
        {error && <h1>{error.message}</h1>}
        {/* <h2>{imagesName}</h2>  */}
        {loading && <div>Loading....</div>}
        {!imagesName && <div>Введите имя для поиска</div>}
        {images && (
          <div>
            {images.map(image => (
              <img key={image.id} src={image.previewURL} alt={image.tags} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImageGallery;
