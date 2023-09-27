/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import '../searchBar/searchBar.css'
import { useDispatch } from 'react-redux';
import {getDriversByName} from '../../redux/actions'
import {refresh} from '../../redux/actions';

const SearchBar= ({ name, setName, setCurrentPage, setOrderByDate,setOrderByAlpha})=>{

    const dispatch = useDispatch();
    const handleName= (event)=> setName(event.target.value.trim())
    const handleSubmit = (name)=>{
          dispatch(getDriversByName(name))
          setCurrentPage(1)
        }
    const handleRefresh = ()=>{
        dispatch(refresh())
        setCurrentPage(1)
        setOrderByDate("")
        setOrderByAlpha("")
    }

    return (
        <div className='searchContainer'>
           <button className='refresh' onClick={()=>handleRefresh()}></button>
            <input  type= 'search' value ={name} onChange={handleName} placeholder="Search Here"></input>
            <button className='search-button' onClick={()=>handleSubmit(name)}>Search</button>
        </div>
    )
};
export default SearchBar;
