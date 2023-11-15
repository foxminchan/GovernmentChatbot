import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../../../@types/global";
import Cookies from "js-cookie";
import { StorageKeys } from "../../constants/keys";
import { Login } from "../../../features/SignIn/types/login.type";
import { AppDispatch } from "../store";
import { axiosService } from "../../utils/inversify";

const initialState: userState = {
    userLogin: Cookies.get(StorageKeys.ACCESS_TOKEN) ? Cookies.get(StorageKeys.ACCESS_TOKEN) : undefined,
    loading: false,
    isLoggedIn: false,
  };
  const userReducer = createSlice({
    name: "userReducer",
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
  
  export const {
    loginAction,
    setLoading,
    setLoggedIn,
  } = userReducer.actions;
  
  export default userReducer.reducer;

  export const loginApi = (userLogin: Login) => {
    return async (dispatch: AppDispatch) => {
      await axiosService.post<Login>("/auth/login", userLogin).then((res) => {
        // let action : PayloadAction<Login> = loginAction({res.data.username, res.data.password});
       
   
        // const action: PayloadAction<string> = loginAction(res.data);
        // if (res.data) {
        //   dispatch(loginAction(res.data));
        //   dispatch(setLoggedIn(true));
        //   Cookies.set(StorageKeys.ACCESS_TOKEN, res.data, { expires: 1 });
        // }
      });
    };
  };