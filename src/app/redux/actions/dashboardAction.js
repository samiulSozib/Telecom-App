import axios from "axios";
import {base_url} from '../../utils/constant'
import { DASHBOARD_DATA_REQUEST, DASHBOARD_DATA_SUCCESS, DASHBOARD_DATA_FAIL } from "../constants/dashboardConstant";


const dashboard_data_url=`${base_url}/dashboard`

export const dashboardData=()=>{
    return async (dispatch)=>{
        
        dispatch({type:DASHBOARD_DATA_REQUEST})
        try{
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(dashboard_data_url,config)
            const {advertisement_sliders}=response.data.data
            dispatch({type:DASHBOARD_DATA_SUCCESS,payload:{advertisement_sliders}})
        }catch(error){
            dispatch({type:DASHBOARD_DATA_FAIL,payload:error.message})
        }
    }
}