import {combineReducers} from 'redux'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import serviceCategoriesReducer from './serviceCategoriesReducer'
import orderListReducer from './orderReducer'


const rootReducer=combineReducers({
    auth:authReducer,
    dashboardReducer:dashboardReducer,
    serviceCategoriesReducer:serviceCategoriesReducer,
    orderListReducer:orderListReducer
})

export default rootReducer