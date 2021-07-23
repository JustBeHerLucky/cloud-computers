import React, { useState, createContext, useEffect } from "react";
import userCartService from "../services/useritems";
import loginService from "../services/login";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  // stores user info (token, name) when user is logged in
  const [user, setUser] = useState(null);

  // retreive user info from local storage, if it exists
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userCartService.setToken(user.token);
    }
  }, []);

  const loginToApp = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      userCartService.setToken(user.token);
      setUser(user);
      return user;
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginToApp }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;