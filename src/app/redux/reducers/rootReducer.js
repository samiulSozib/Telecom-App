import {combineReducers} from 'redux'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import serviceCategoriesReducer from './serviceCategoriesReducer'
import orderListReducer from './orderReducer'
import transactionListReducer from './transactionReducer'


const rootReducer=combineReducers({
    auth:authReducer,
    dashboardReducer:dashboardReducer,
    serviceCategoriesReducer:serviceCategoriesReducer,
    orderListReducer:orderListReducer,
    transactionListReducer:transactionListReducer
})

export default rootReducer