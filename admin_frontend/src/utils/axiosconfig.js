const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Accept: "text/plain",
    "Content-Type": "application/json",
  },
};
