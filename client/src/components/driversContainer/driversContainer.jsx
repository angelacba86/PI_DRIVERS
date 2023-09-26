/* eslint-disable react/prop-types */
import '../driversContainer/driversContainer.css'
import Driver from '../driver/driver';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const DriverContainer = ({ currentDriver }) => {
const noInfo= useSelector(state=>state.noInfo)

if(currentDriver.length === 0) return noInfo

return (
    <div className='driverContainer'>
      {currentDriver.map(({ id, name, image, teams, origin, dob,surname }) => (
        <Driver
          key={id}
          id={id}
          name={name}
          surname={surname}
          image={image}
          teams={teams}
          origin={origin}
          dob={dob}
        />
      ))}
    </div>
  );
};
export default DriverContainer;