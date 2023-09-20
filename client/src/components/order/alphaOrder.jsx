import {useDispatch} from 'react-redux'
import { orderBy } from '../../redux/actions';
const AlphaOrder = ()=>{

    const dispatch = useDispatch();
    const orderHandler= event =>{
        const orderValue= event.target.value;
        dispatch(orderBy(orderValue))
    }
    return (
        <div>
            <select onChange={orderHandler}>
                <option value='az'> A to Z</option>
                <option value='za'> Z to A</option>
            </select>
        </div>
    )
};
export default AlphaOrder;