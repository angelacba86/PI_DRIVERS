/* eslint-disable react/prop-types */
 import '../driver/driver.css'
 import { NavLink } from 'react-router-dom';

const Driver=({id,image,name,teams,origin,dob,surname})=>{

    return(
        <div className='driverCard' key={id}  value={dob}>
        <div className='imagen-contenedor'>
            <div className='origin'><p>{origin}</p></div>
            <img className='imagen'src={image} alt={name}/></div>
        <div className='texto-contenedor'>
        <h3>{`${name} ${surname}`}</h3>
        <p>Teams:{teams}</p>
        <NavLink to={`${id}`}><button className='detail-button'>more...</button></NavLink>
        </div>
        </div>
    )
};

export default Driver;