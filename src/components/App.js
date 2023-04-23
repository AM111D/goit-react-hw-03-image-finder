import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imagesName: '',
  };

  handleFormSubmit = imagesName => {
    console.log(imagesName);
    this.setState({ imagesName });
  };

  render() {
    return (
      <div>
        {/* {this.state.loading && <h1>download...</h1>}
        {this.state.images && <div>{this.state.images.id}</div>} */}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imagesName={this.state.imagesName} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
