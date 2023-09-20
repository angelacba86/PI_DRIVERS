import {useDispatch} from 'react-redux'
import { orderBy } from '../../redux/actions';
const DateOrder = ()=>{
    const dispatch= useDispatch();

    const orderHandler = event =>{
        const orderValue= event.target.value;
        dispatch (orderBy(orderValue))
    }

    return (
        <div>
            <select onChange={orderHandler}>
                <option value='date_asc'>Ascendent</option>
                <option value='date_desc'>Descendent</option>
            </select>
        </div>
    )
};
export default DateOrder;