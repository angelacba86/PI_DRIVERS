/* eslint-disable react/prop-types */
import '../searchBar/searchBar.css'
import { useDispatch } from 'react-redux';
import {getDriversByName} from '../../redux/actions'

const SearchBar= ({ name, setName, setCurrentPage })=>{

    const dispatch = useDispatch();
    const handleName= (event)=> setName(event.target.value.trim())
    const handleSubmit = (name)=>{
          dispatch(getDriversByName(name))
          setCurrentPage(1)
        }

    return (
        <div className='searchContainer'>
           <br/>
            <input  type= 'search' value ={name} onChange={handleName} placeholder="Search Here"></input>
            <button className='search-button' onClick={()=>handleSubmit(name)}>Search</button>
        </div>
    )
};
export default SearchBar;
