import React, {Component} from 'react';

class App extends Component {
  // state = {  }

  componentDidMount() {
    fetch('https://pixabay.com/api/?q=cat&page=1&key=25187003-ac92f0861cd819d45c4ecbcb8&image_type=photo&orientation=horizontal&per_page=12').then( res => res.json()).then(console.log)
  }

  render() {
    return (
      <div>
        <p>qwe</p>
      </div>
    );
  }
}

export default App;