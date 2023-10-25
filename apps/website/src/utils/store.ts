import rootReducer from '../features';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export { store };
