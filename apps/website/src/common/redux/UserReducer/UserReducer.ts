import {
  LoginPayload,
  LoginResponse,
} from '../../../features/SignIn/types/login.type';
import Cookies from 'js-cookie';
import { HttpStatusCode } from 'axios';
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
    const response = await axiosService.post<LoginResponse>(
      '/auth/login',
      userLogin
    );
    if (response.status === HttpStatusCode.Created) {
      Cookies.set(StorageKeys.ACCESS_TOKEN, response.data.access_token, {
        expires: 1,
      });
      window.location.href = '/';
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userLogin = action.payload.access_token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = 'Tên đăng nhập hoặc mật khẩu không đúng';
      });
  },
});

export default userSlice.reducer;
