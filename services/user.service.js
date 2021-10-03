import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(sessionStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getAll,
  updatePassCode,
};

function updatePassCode(phone, passCode) {
  return fetchWrapper
    .put(`${baseUrl}/passCode`, { phone, passCode })
    .then((res) => {
      return res;
    });
}

function login(phone, passCode) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { phone, passCode })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  sessionStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
