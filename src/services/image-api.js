const FetchImageApi = async (imagesName, page = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=25187003-ac92f0861cd819d45c4ecbcb8&q=${imagesName}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`Could not fetch images, received ${response.status}`);
  }
  const data = await response.json();
  return data.hits;
};

export default FetchImageApi;
