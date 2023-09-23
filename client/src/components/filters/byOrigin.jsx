/* eslint-disable react/prop-types */
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
      <select onChange={handleSelect}>
         <option value='' defaultValue>Filter by Origin</option>
         <option value='API'>API</option>
         <option value='DB'>DB</option>
      </select>
    </div>
 )   
}
export default ByOrigin;