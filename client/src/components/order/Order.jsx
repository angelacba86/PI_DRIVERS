import './order.css'
import {useDispatch} from 'react-redux'
import { orderBy } from '../../redux/actions';
const Order = ()=>{

    const dispatch = useDispatch();
    const orderHandler= event =>{
        const orderValue= event.target.value;
        dispatch(orderBy(orderValue))
    }
    return ( 
        <div className='orders-container'>
           <label className='orders-font'>Order By:</label>
           <div>
            <select onChange={orderHandler}>
                <option value=''>Alphabetical Order</option>
                <option value='az'> A to Z</option>
                <option value='za'> Z to A</option>
            </select>

            <select onChange={orderHandler}>
                <option value=''> Date of Birth</option>
                <option value='date_asc'>Ascendent</option>
                <option value='date_desc'>Descendent</option>
            </select>
           </div>
        </div>
    )
};
export default Order;