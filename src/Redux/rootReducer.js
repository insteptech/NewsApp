// Description: Root Reducer - Updated

import { combineReducers } from 'redux'

import newsReducer from '../Reducer/newsReducer'

// Combine all the reducers
const rootReducer = combineReducers({ newsReducer })

export default rootReducer
