import axios from "axios";
import {base_url} from '../../utils/constant'
import { LOGOUT, SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../constants/authConstant";


const login_url=`${base_url}/login`

export const signIn=(singInInfo)=>{
    return async (dispatch)=>{
        
        dispatch({type:SIGN_IN_REQUEST})
        try{
            const response=await axios.post(login_url,singInInfo)
            const {api_token,user_info}=response.data.data
            //console.log(api_token)
            dispatch({type:SIGN_IN_SUCCESS,payload:{api_token,user_info}})
        }catch(error){
            dispatch({type:SIGN_IN_FAIL,payload:error.message})
        }
    }
}

export const logout = () => {
    return (dispatch) => {
      localStorage.removeItem('user_info');
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
    };
  };