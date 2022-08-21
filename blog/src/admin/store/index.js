import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './reducer'

const reducer = combineReducers({
    common: commonReducer
})

const store = configureStore({reducer}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;