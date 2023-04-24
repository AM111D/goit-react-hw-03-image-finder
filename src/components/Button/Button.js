function LoadMoreBtn({ page, isButtonDisabled }) {
  const handleClick = event => {
    event.preventDefault();
    page();
  };

  return (
    <>
      <button type="button" onClick={handleClick} disabled={!isButtonDisabled}>
        MORE
      </button>
    </>
  );
}

export default LoadMoreBtn;
