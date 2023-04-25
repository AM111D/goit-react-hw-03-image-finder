const ButtonLoadMore = ({ loadMoreImages, disabled }) => {
  //   console.log(props);
  return (
    <button type="button" onClick={loadMoreImages} disabled={disabled}>
      more
    </button>
  );
};

export default ButtonLoadMore;
