import css from './WaterProgressBar.module.css';
import { useEffect, useRef, useState } from 'react';

const WaterProgressBar = ({ progress }) => {
  const containerRef = useRef(null);
  const [ellipsePosition, setEllipsePosition] = useState(10);

  const updateEllipsePosition = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      let adjustedProgress = Math.min(100, Math.max(0, progress));
      let newPosition = (adjustedProgress * containerWidth) / 100;

      if (adjustedProgress >= 0 && adjustedProgress <= 5) {
        newPosition = 10;
      } else if (adjustedProgress === 100) {
        newPosition = containerWidth; 
      }

       if (window.innerWidth > 768) {
        if (adjustedProgress >= 0 && adjustedProgress <= 5) {
          newPosition = 15;
        } else if (adjustedProgress === 100) {
          newPosition = containerWidth+10;
        } else {
           newPosition = (adjustedProgress * (containerWidth+20)) / 100;
        }
      }
      setEllipsePosition(newPosition);
    }
  };

  useEffect(() => {
    updateEllipsePosition();
  }, [progress]);

  useEffect(() => {
    window.addEventListener('resize', updateEllipsePosition);
    return () => {
      window.removeEventListener('resize', updateEllipsePosition);
    };
  }, []);

  const shouldShowPercentage =
    (progress >= 15 && progress <= 40) || (progress >= 60 && progress <= 90);

  return (
    <div className={css.waterProgressBarContainer}>
      <div className={css.progressBarInfo}>
        <p className={css.data}>Today</p>
        {/* <ChooseDate className={css.data} /> */}

        <div className={css.progressBarContainer} ref={containerRef}>
          <div
            className={css.progressBar}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
          <div
            className={css.progressEllipse}
            style={{ left: `${ellipsePosition}px` }}
          ></div>
        </div>
        {shouldShowPercentage && (
          <div
            className={css.progressPercentageMove}
            style={{ left: `${ellipsePosition}px` }}
          >
            {progress}%
          </div>
        )}

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
