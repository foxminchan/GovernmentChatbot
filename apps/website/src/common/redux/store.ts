import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer  from './UserReducer/UserReducer';

const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware: [thunk],
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
