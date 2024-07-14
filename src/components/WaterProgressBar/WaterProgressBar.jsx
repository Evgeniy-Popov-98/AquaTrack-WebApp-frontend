import css from './WaterProgressBar.module.css';
const WaterProgressBar = ({ progress }) => {
  let adjustedProgress = Math.min(100, Math.max(0, 0));//progress
  let ellipsePosition = (adjustedProgress * (174 + 12)) / 100;

  if (adjustedProgress >= 0 && adjustedProgress <= 5) {
    ellipsePosition = 10;
  } else if (adjustedProgress === 100) {
    ellipsePosition = 174;
  }
  return (
    <div className={css.waterProgressBarContainer}>
      <div className={css.progressBarInfo}>
        <p className={css.data}> Today </p>

        <div className={css.progressBarContainer}>
          <div
            className={css.progressBar}
            style={{ width: `${adjustedProgress}%` }}
          ></div>
          <div
            className={css.progressEllipse}
            style={{ left: `${ellipsePosition}px` }}
          ></div>
        </div>
        {/* <div className={css.progressPercentageMove}>
            {adjustedProgress}%
          </div> */}

        <ul className={css.progressPercentage}>
          <li>0%</li>
          <li>50%</li>
          <li>100%</li>
        </ul>
      </div>
    </div>
  );
};

export default WaterProgressBar;
