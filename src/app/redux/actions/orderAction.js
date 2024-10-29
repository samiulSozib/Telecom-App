import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL } from "../constants/orderConstant";


const orders_url=`${base_url}/orders? page=1 & items_per_page=10`

export const getOrders=()=>{
    return async (dispatch)=>{
        
        dispatch({type:ORDER_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(orders_url,config)
            const {orders}=response.data.data
            
           
            //console.log(orders)
            dispatch({type:ORDER_LIST_SUCCESS,payload:{orders}})
        }catch(error){
            dispatch({type:ORDER_LIST_FAIL,payload:error.message})
        }
    }
}


