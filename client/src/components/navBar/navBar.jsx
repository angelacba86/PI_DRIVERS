/* eslint-disable react/prop-types */
import '../navBar/navBar.css'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../searchBar/searchBar';
import Order from '../order/Order';
import ByTeams from '../filters/byTeams';
import ByOrigin from '../filters/byOrigin';


const NavBar= ({name,setName, setCurrentPage, setLastFilterApplied})=>{

    const { pathname } = useLocation();

    const [orderByAlpha, setOrderByAlpha] = useState("");
    const [orderByDate, setOrderByDate]=useState("")

    return(
        <div className='navBarContainer'>
            <div className='navBarMenus'>            
            <div><Link to={'/'}><img src='https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-5-1.png' alt='Formula 1' className='logo-navbar'/></Link></div>
            <div className={`menu ${pathname === '/home'? 'active disable': ''} `}><Link to={'/home'}>HOME</Link></div>
            <div className={`menu ${pathname === '/newDriver' ? 'active disable': ''}`}><Link to={'/newDriver'}>NEW DRIVER</Link></div>
            </div>
            <div className='navBarFiltros'>
            {pathname ==='/home' && <>
            <Order orderByDate={orderByDate} setOrderByDate={setOrderByDate} orderByAlpha={orderByAlpha} setOrderByAlpha={setOrderByAlpha}/>
            <ByTeams setCurrentPage={setCurrentPage}  setLastFilterApplied={setLastFilterApplied}/>
            <ByOrigin setCurrentPage={setCurrentPage} setLastFilterApplied={setLastFilterApplied}/>
            <SearchBar name={name} setName={setName} setCurrentPage={setCurrentPage} setOrderByDate={setOrderByDate} setOrderByAlpha={setOrderByAlpha}/>
            </>}
            </div>

        </div>
    )
};
export default NavBar;
