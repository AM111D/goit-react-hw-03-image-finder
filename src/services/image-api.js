function fetchImageApi(name, page = 1) {
  return fetch(
    `https://pixabay.com/api/?key=25187003-ac92f0861cd819d45c4ecbcb8&q=${name}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`нет картинок с именем ${name}`));
    })
    .then(images => images.hits);
}

export default fetchImageApi;
