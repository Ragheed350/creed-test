import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils";
import { user } from "../services/user";
import { AppThunk } from "../store";
import { toast } from "../../utils/helpers/ToastConfigurator";
import { Login_Req } from "../models/auth";
import history from "../../utils/helpers/history";

interface AuthState {
  status: RequestStatus;
  isAuth: boolean;
  credentials?: Login_Req;
}

let initialState: AuthState = {
  status: "nothing",
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    login: (state, { payload }: PayloadAction<Login_Req>) => {
      state.credentials = payload;
      state.isAuth = true;
    },
  },
});

const { setStatus, login } = AuthSlice.actions;

export const LoginAsync =
  (req: Login_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      await user.justPromise();
      dispatch(login(req));
      dispatch(setStatus("data"));
      history.navigate("/");
    } catch (err: any) {
      dispatch(setStatus("error"));
      toast.error("Somthing Went Wrong");
    }
  };

export default AuthSlice.reducer;
