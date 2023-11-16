import {
  LoginPayload,
  LoginResponse,
} from '../../../features/SignIn/types/login.type';
import Cookies from 'js-cookie';
import { userState } from '../../../@types/global';
import { StorageKeys } from '../../constants/keys';
import { axiosService } from '../../utils/inversify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: userState = {
  userLogin: Cookies.get(StorageKeys.ACCESS_TOKEN) ?? undefined,
  loading: false,
  isLoggedIn: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'user/login',
  async (userLogin: LoginPayload, thunkAPI) => {
    await axiosService
      .post<LoginResponse>('/auth/login', userLogin)
      .then((res) => {
        const accessToken = res.data.access_token;
        Cookies.set(StorageKeys.ACCESS_TOKEN, accessToken, { expires: 1 });
        window.location.href = '/';
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err.response.data.message);
      });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginThunk.pending.type]: (state: userState) => {
      state.loading = true;
    },
    [loginThunk.fulfilled.type]: (state: userState, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userLogin = action.payload;
    },
    [loginThunk.rejected.type]: (state: userState, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.error;
    },
  },
});

export default userSlice.reducer;
