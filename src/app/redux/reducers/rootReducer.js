import {combineReducers} from 'redux'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import serviceCategoriesReducer from './serviceCategoriesReducer'
import orderListReducer from './orderReducer'
import transactionListReducer from './transactionReducer'
import subResellerListReducer from './subResellerReducer'


const rootReducer=combineReducers({
    auth:authReducer,
    dashboardReducer:dashboardReducer,
    serviceCategoriesReducer:serviceCategoriesReducer,
    orderListReducer:orderListReducer,
    transactionListReducer:transactionListReducer,
    subResellerListReducer:subResellerListReducer
})

export default rootReducer