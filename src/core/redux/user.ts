import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus, api } from "../../utils";
import { User } from "../models/user";
import { user } from "../services/user";
import { AppThunk } from "../store";

interface UsersState {
  status: RequestStatus;
  users: User[];
  user?: User;
}

let initialState: UsersState = {
  status: "nothing",
  users: [],
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    Insert: ({ users }, { payload }: PayloadAction<User>) => {
      users.push(payload);
    },
    Update: (state, { payload }: PayloadAction<User>) => {
      let ind = state.users.findIndex((el) => el.userId === payload.userId);
      if (ind !== -1) state.users[ind] = payload;
    },
    Delete: ({ users }, { payload }: PayloadAction<string>) => {
      let index = users.findIndex((el) => el.userId === payload);
      if (index !== -1) users.splice(index, 1);
    },
    Show: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    Fetch: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
  },
});

const { setStatus, Fetch, Delete, Update } = UsersSlice.actions;

export const FetchUsersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const result = await user.fetch();
    dispatch(Fetch(result));
    dispatch(setStatus("data"));
  } catch (err: any) {
    dispatch(setStatus("error"));
  }
};

export const UpdateUserAsync =
  (req: { userId: number }): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const result = await api.post<{ body: User }>(`/admin/dashboard/user/reward/${req.userId}/edit`, req);
      dispatch(Update(result.data.body));
      dispatch(setStatus("data"));
      //toast
    } catch (err: any) {
      dispatch(setStatus("error"));
      //toast
    }
  };

export const DeleteUserAsync =
  (req: { userId: string }): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const result = await api.delete<{ body: User }>(`/admin/user/${req.userId}/delete`);
      dispatch(Delete(req.userId));
      dispatch(setStatus("data"));
      //   toast.success("Updated successfully");
    } catch (err: any) {
      dispatch(setStatus("error"));
      //   toast.error("error");
    }
  };

export const CreateUserAsync =
  (vals: User): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      await api.post<{ body: any }>("/admin/staking/create", vals);
      dispatch(setStatus("data"));
      //   toast.success("Added successfully");
    } catch (err: any) {
      dispatch(setStatus("error"));
      //   toast.error("Somthing went wrong");
    }
  };

export default UsersSlice.reducer;