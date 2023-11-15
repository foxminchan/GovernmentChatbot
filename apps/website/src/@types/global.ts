import { Login } from "../features/SignIn/types/login.type";


export type userState ={
    userLogin: string | undefined;
    loading: boolean;
    isLoggedIn: boolean;
  }