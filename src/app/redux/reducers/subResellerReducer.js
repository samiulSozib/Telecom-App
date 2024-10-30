import { 
    SUB_RESELLER_LIST_REQUEST, 
    SUB_RESELLER_LIST_SUCCESS, 
    SUB_RESELLER_LIST_FAIL } from "../constants/subResellerConstant";


const initialState={
    subResellerList:[],
    error:null ,
    loading:false,
    total_items:0
    
}

const subResellerListReducer=(state=initialState,action)=>{

    switch(action.type){
        case SUB_RESELLER_LIST_REQUEST:
            return {...state,loading:true}
        case SUB_RESELLER_LIST_SUCCESS:
            return {...state,loading:false,subResellerList:action.payload.resellers,total_items:action.payload.total_items}
        case SUB_RESELLER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default subResellerListReducer