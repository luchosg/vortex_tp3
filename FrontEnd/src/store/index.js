import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducers';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const store = configureStore(
  {
    reducer: reducer,
  }, 
  applyMiddleware(thunk)
)

export default store