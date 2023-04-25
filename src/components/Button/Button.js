function LoadMoreBtn({ page, disabled }) {
  const handleClick = event => {
    event.preventDefault();
    page();
  };

  return (
    <>
      <button type="button" onClick={handleClick} disabled={disabled}>
        MORE
      </button>
    </>
  );
}

export default LoadMoreBtn;
