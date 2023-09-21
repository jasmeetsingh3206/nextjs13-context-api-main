"use-client"

import React, { cache, use } from "react";
import { User } from "../app/types";

const getUsers = cache(() =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json())
);

export default function ListUsers() {
  let users = use<User[]>(getUsers());

  return (
    <>
      <div className="border border-red-300"

      >
        {users.map((user) => (
          <div className="bg-red-900 text-2xl"
            key={user.id}

          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}

            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
