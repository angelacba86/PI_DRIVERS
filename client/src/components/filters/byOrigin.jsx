/* eslint-disable react/prop-types */
import './filters.css'
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../redux/actions";
const ByOrigin= ({setCurrentPage, setLastFilterApplied})=>{
   const dispatch= useDispatch();

   const handleSelect = event =>{
      const origin= event.target.value;
      dispatch(filterByOrigin(origin))
      setCurrentPage(1)
      setLastFilterApplied("origin")
   }

 return (
    <div>
      <label className="filters">Filter by Origin:</label><br/>
      <select onChange={handleSelect} className='select'>
         <option value=''>All Origin</option>
         <option value='Api'>Api</option>
         <option value='Created'>Created</option>
      </select>
    </div>
 )   
}
export default ByOrigin;