/* eslint-disable react/prop-types */
import '../navBar/navBar.css'
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import AlphaOrder from '../order/alphaOrder';
import DateOrder from '../order/dateOrder';
import ByTeams from '../filters/byTeams';
import ByOrigin from '../filters/byOrigin';

const NavBar= ({name,setName, setCurrentPage})=>{

    return(
        <div className='navBarContainer'>
            <div className='navBarMenus'>            
            <div><Link to={'/'}>Landing</Link></div>
            <div><Link to={'/home'}>Home</Link></div>
            <div><Link to={'/newDriver'}>New Driver</Link></div>
            </div>
            <SearchBar name={name} setName={setName} setCurrentPage={setCurrentPage} />
            <AlphaOrder/>
            <DateOrder/>
            <ByTeams setCurrentPage={setCurrentPage}/>
            <ByOrigin setCurrentPage={setCurrentPage}/>
        </div>
    )
};
export default NavBar;
