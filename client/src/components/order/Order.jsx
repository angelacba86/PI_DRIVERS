/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './order.css'
import {useDispatch} from 'react-redux'
import { orderBy } from '../../redux/actions';
const Order = ({orderByAlpha, setOrderByAlpha,
    orderByDate, setOrderByDate})=>{

    const dispatch = useDispatch();
    const orderHandler= event =>{
        const orderValue= event.target.value;
        const orderId= event.target.id;
        if (orderId === 'Alpha') {
            setOrderByAlpha(orderValue);
            setOrderByDate(""); 
        } else if (orderId === 'Date') {
            setOrderByAlpha(""); 
            setOrderByDate(orderValue);
        }
        dispatch(orderBy(orderValue))
    }
    return ( 
        <div className='orders-container'>
           <label className='orders-font'>Order By:</label>
           <div>
            <select id='Alpha' value={orderByAlpha} onChange={orderHandler}>
                <option selected value="">Alphabetical Order</option>
                <option value='az'> A to Z</option>
                <option value='za'> Z to A</option>
            </select>

            <select id='Date' value={orderByDate} onChange={orderHandler}>
                <option selected value=""> Date of Birth</option>
                <option value='date_asc'>Ascendent</option>
                <option value='date_desc'>Descendent</option>
            </select>
           </div>
        </div>
    )
};
export default Order;