import { DASHBOARD_DATA_REQUEST, DASHBOARD_DATA_SUCCESS, DASHBOARD_DATA_FAIL } from "../constants/dashboardConstant";

const initialState={
    advertisement_sliders:[],
    error:null ,
    loading:false,
    
}

const dashboardReducer=(state=initialState,action)=>{

    switch(action.type){
        case DASHBOARD_DATA_REQUEST:
            return {...state,loading:true}
        case DASHBOARD_DATA_SUCCESS:
            return {...state,loading:false,advertisement_sliders:action.payload.advertisement_sliders}
        case DASHBOARD_DATA_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default dashboardReducer