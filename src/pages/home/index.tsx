import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { User } from "../../core/models";
import { useAppDispatch, useAppSelector } from "../../core/hooks";
import { FetchUsersAsync } from "../../core/redux/user";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.Users);

  useEffect(() => {
    dispatch(FetchUsersAsync());
    console.log(users);
  }, []);

  return (
    <div>
      home
      <ul>
        {users.map((usr) => (
          <li key={usr.userId}>{usr.username}</li>
        ))}
      </ul>
    </div>
  );
};
