/* eslint-disable react/prop-types */
import '../driversContainer/driversContainer.css'
import Driver from '../driver/driver';
// import { useSelector } from 'react-redux/es/hooks/useSelector';

const DriverContainer = ({ currentDriver }) => {

if(currentDriver.length === 0) return <p>Loading...</p>
return (
    <div className='driverContainer'>
      {currentDriver.map(({ id, name, image, teams, origin, dob }) => (
        <Driver
          key={id}
          id={id}
          name={name}
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