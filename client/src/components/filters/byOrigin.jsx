/* eslint-disable react/prop-types */
import './filters.css'
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../redux/actions";
const ByOrigin= ({setCurrentPage})=>{
   const dispatch= useDispatch();

   const handleSelect = event =>{
      const origin= event.target.value;
      dispatch(filterByOrigin(origin))
      setCurrentPage(1)
   }

 return (
    <div>
      <select onChange={handleSelect} className='select'>
         <option value=''>All Origin</option>
         <option value='API'>API</option>
         <option value='DB'>DB</option>
      </select>
    </div>
 )   
}
export default ByOrigin;