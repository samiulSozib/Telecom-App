import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    SUB_RESELLER_LIST_REQUEST, 
    SUB_RESELLER_LIST_SUCCESS, 
    SUB_RESELLER_LIST_FAIL } from "../constants/subResellerConstant";




export const getSubReseller=()=>{
    return async (dispatch)=>{
        
        dispatch({type:SUB_RESELLER_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const sub_reseller_url=`${base_url}/sub-resellers`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(sub_reseller_url,config)
            const {resellers}=response.data.data
            const total_items=response.data.payload.pagination.total
            
           
            //console.log(resellers)
            dispatch({type:SUB_RESELLER_LIST_SUCCESS,payload:{resellers,total_items}})
        }catch(error){
            dispatch({type:SUB_RESELLER_LIST_FAIL,payload:error.message})
        }
    }
}


