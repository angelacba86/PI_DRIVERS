/* eslint-disable react/prop-types */
 import '../driver/driver.css'
 import { NavLink } from 'react-router-dom';

const Driver=({id,image,name,teams,origin,dob})=>{

    return(
        <div className='driverCard' key={id}  value={dob}>
        <NavLink to={`${id}`}>
        <div className='imagen-contenedor'><img className='imagen'src={image} alt={name}/></div>
        <div className='texto-contenedor'>
        <p>{name}</p>
        <p>Teams:{teams}</p>
        <p>Origin:{origin}</p>

        </div>
        </NavLink>
        </div>
    )
};

export default Driver;