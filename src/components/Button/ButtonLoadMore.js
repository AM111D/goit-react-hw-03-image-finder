import css from './ButtonLoadMore.module.css';

const ButtonLoadMore = ({ loadMoreImages, disabled }) => {
  //   console.log(props);
  return (
    <button
      type="button"
      onClick={loadMoreImages}
      disabled={disabled}
      className={css.btn}
    >
      more
    </button>
  );
};

export default ButtonLoadMore;
