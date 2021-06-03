import React from "react";
import {UserCard} from "./UserCard";

export const UsersList = ({users}) => {

  if (!users.length) {
    return <p>There is no adverts created by current user</p>;
  }
  return (
    <>
      {users.map((el) => {
        return <div key={el._id}>
          <UserCard user={el}/>
        </div>;
      })}
    </>
  );
};