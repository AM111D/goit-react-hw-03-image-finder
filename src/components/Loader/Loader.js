import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

function ImagesLoader() {
  return (
    <div className={css.loader}>
      <h2>Loading</h2>
      <ThreeCircles
        height="100"
        width="100"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

export default ImagesLoader;
