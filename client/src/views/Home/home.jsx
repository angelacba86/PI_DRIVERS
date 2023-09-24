/* eslint-disable react/prop-types */
import '../Home/home.css'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getAllDrivers } from '../../redux/actions';
import DriverContainer from '../../components/driversContainer/driversContainer';
import Pagination from '../../components/pagination/pagination';

const Home=({currentPage,setCurrentPage,startPage,setStartPage})=>{

    const allDrivers = useSelector(state=> state.allDrivers)
    const filteredDrivers = useSelector(state => state.filteredDrivers)
    const dispatch= useDispatch();

    ///---Get all Drivers---///
    useEffect(()=>{
        dispatch(getAllDrivers())
    },[dispatch])

    ///--- Pagination ---///

    const driversToShow= filteredDrivers?.length ? filteredDrivers : allDrivers;
    const driversPerPage =9;
    const pagesToShow = 12;
    const totalPages= Math.ceil(driversToShow.length / driversPerPage);
    const startIndex = (currentPage - 1)* driversPerPage;
    const endIndex = startIndex + driversPerPage;
    let currentDriver = driversToShow.slice(startIndex,endIndex);

    const pageHandler = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber < startPage) {
            setStartPage(prevStartPage => prevStartPage - pagesToShow);
        } else if (pageNumber >= startPage + pagesToShow) {
            setStartPage(prevStartPage => prevStartPage + pagesToShow);
        }
    }

    return(
        <div className='centered-container'>
            <DriverContainer currentDriver={currentDriver}/>
            <Pagination totalPages={totalPages} currentPage = {currentPage} pageHandler={pageHandler} startPage={startPage} setStartPage={setStartPage} pagesToShow={pagesToShow}/>
        </div>
    )
};
export default Home;