import {
  Login,
  LoginResponse,
} from '../../../features/SignIn/types/login.type';
import Cookies from 'js-cookie';
import { AppDispatch } from '../store';
import { userState } from '../../../@types/global';
import { StorageKeys } from '../../constants/keys';
import { axiosService } from '../../utils/inversify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: userState = {
  userLogin: Cookies.get(StorageKeys.ACCESS_TOKEN)
    ? Cookies.get(StorageKeys.ACCESS_TOKEN)
    : undefined,
  loading: false,
  isLoggedIn: false,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state: userState, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
    setLoading: (state: userState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoggedIn: (state: userState, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loginAction, setLoading, setLoggedIn } = userReducer.actions;

export default userReducer.reducer;

export function loginApi(userLogin: Login) {
  return async (dispatch: AppDispatch) => {
    await axiosService
      .post<LoginResponse>('/auth/login', userLogin)
      .then((res) => {
        const action: PayloadAction<string> = loginAction(
          res.data.access_token
        );
        dispatch(action);
        Cookies.set(StorageKeys.ACCESS_TOKEN, res.data.access_token, {
          expires: 1,
        });
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
