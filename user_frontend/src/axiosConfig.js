const getTokenFromLocalStorage = localStorage.getItem("jwtToken")
  ? JSON.parse(localStorage.getItem("jwtToken"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
    Accept: "application/json",
  },
};
