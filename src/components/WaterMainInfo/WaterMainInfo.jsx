import AddWaterBtn from '../AddWaterBtn/AddWaterBtn'

import css from './WaterMainInfo.module.css'

const WaterMainInfo = () => {
  return (
      <div className={css.waterMainInfoContainer}>
          
          <AddWaterBtn />
    </div>
  )
}

export default WaterMainInfo