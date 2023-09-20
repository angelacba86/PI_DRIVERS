import '../navBar/navBar.css'
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import AlphaOrder from '../order/alphaOrder';
import DateOrder from '../order/dateOrder';
import ByTeams from '../filters/byTeams';
// eslint-disable-next-line react/prop-types
const NavBar= ({name,setName, setCurrentPage})=>{

    return(
        <div>
            <div>            
            <div><Link to={'/'}>Landing</Link></div>
            <div><Link to={'/home'}>Home</Link></div>
            <div><Link to={'/newDriver'}>New Driver</Link></div>
            </div>
            <SearchBar name={name} setName={setName} setCurrentPage={setCurrentPage} />
            <AlphaOrder/>
            <DateOrder/>
            <ByTeams setCurrentPage={setCurrentPage}/>
        </div>
    )
};
export default NavBar;
