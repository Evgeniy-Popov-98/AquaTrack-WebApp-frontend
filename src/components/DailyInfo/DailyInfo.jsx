import AddWaterBtn2 from '../AddWaterBtn2/AddWaterBtn2.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';

const DailyInfo = () => {
  return (
    <div style={{ margin: '40px 0px' }}>
      <div
        style={{
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ChooseDate />
        <AddWaterBtn2 />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
