import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils";
import { User } from "../models/user";
import { user } from "../services/user";
import { AppThunk } from "../store";
import { faker } from "@faker-js/faker";

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
      users.unshift({ ...payload, userId: faker.datatype.uuid(), avatar: faker.internet.avatar() });
    },
    Update: (state, { payload }: PayloadAction<User>) => {
      let ind = state.users.findIndex((el) => el.userId === payload.userId);
      if (ind !== -1) state.users[ind] = { ...state.users[ind], ...payload };
    },
    Delete: ({ users }, { payload }: PayloadAction<string[]>) => {
      payload.forEach((userId) => {
        let index = users.findIndex((el) => el.userId === userId);
        if (index !== -1) users.splice(index, 1);
      });
    },
    Show: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    Fetch: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
  },
});

const { setStatus, Fetch, Delete, Update, Insert, Show } = UsersSlice.actions;

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

export const ShowUserAsync =
  (req: User): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      dispatch(Show(req));
      dispatch(setStatus("data"));
    } catch (err: any) {
      dispatch(setStatus("error"));
    }
  };

export const UpdateUserAsync =
  (req: User): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      dispatch(Update(req));
      dispatch(setStatus("data"));
      //toast
    } catch (err: any) {
      dispatch(setStatus("error"));
      //toast
    }
  };

export const DeleteUserAsync =
  (ids: string[]): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      dispatch(Delete(ids));
      dispatch(setStatus("data"));
      //   toast.success("Updated successfully");
    } catch (err: any) {
      dispatch(setStatus("error"));
      //   toast.error("error");
    }
  };

export const CreateUserAsync =
  (req: User): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      dispatch(Insert(req));
      dispatch(setStatus("data"));
      //   toast.success("Added successfully");
    } catch (err: any) {
      dispatch(setStatus("error"));
      //   toast.error("Somthing went wrong");
    }
  };

export default UsersSlice.reducer;
