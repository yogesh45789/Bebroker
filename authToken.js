const authToken = {
  setToken: (accessToken = null, refreshToken = null) => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
  },
  getToken: () => {
    return {
      accessToken: localStorage.getItem("access_token"),
      refreshToken: localStorage.getItem("refresh_token"),
    };
  },
  removeToken: () => {
    // get theme and theme mode from local store
    // const theme = localStorage.getItem("theme");
    // const theme_mode = localStorage.getItem("theme_mode");

    // clear local store
    localStorage.clear();

    // set theme and theme mode to local store
    // localStorage.setItem("theme", theme);
    // localStorage.setItem("theme_mode", theme_mode);
  },
};
export default authToken;
