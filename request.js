import axios from "axios";
import store from "@/store";
import authToken from "../common/authToken";
import moment from "moment";
import jwt_decode from "jwt-decode";
import router from "../router";
import urls from "./urls";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

let isRefreshing = false;
let requestQueue = [];

const callRequestsFromQueue = (error, access_token) => {
    requestQueue.forEach((req) => {
        if (error) req.reject(error);
        else req.resolve(access_token);
    });
    requestQueue = [];
};

// request interceptor
axios.interceptors.request.use(
    (req) => {
        if (req.headers.authorization) {
            const { accessToken, refreshToken } = authToken.getToken();
            if (accessToken && refreshToken) {
                const refresh = jwt_decode(refreshToken);
                const isRefreshExpired =
                    moment.unix(refresh.exp).diff(moment()) < 1;
                if (isRefreshExpired) {
                    authToken.removeToken();
                    router.push({ name: "login" });
                    return null;
                }
                return req;
            }
            return null;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const req = error.config;

        if (error.response.status === 401 && !req._retry) {
            if (error.response.data.code == "user_not_found") {
                authToken.removeToken();
                router.push({ name: "login" });
                return null;
            }
            const { refreshToken } = authToken.getToken();

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    requestQueue.push({ resolve, reject });
                })
                    .then((access_token) => {
                        req.headers["authorization"] = "Bearer " + access_token;
                        return axios(req);
                    })
                    .catch((error) => {
                        return Promise.reject(error);
                    });
            }

            req._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                axios
                    .post(urls.auth.refreshToken, {
                        refresh_token: refreshToken,
                    })
                    .then((response) => {
                        const access_token = response.data.data.access_token;
                        const refresh_token = response.data.data.refresh_token;
                        authToken.setToken(access_token, refresh_token);
                        req.headers["authorization"] = "Bearer " + access_token;
                        callRequestsFromQueue(null, access_token);
                        resolve(axios(req));
                    })
                    .catch((error) => {
                        authToken.removeToken();
                        router.push({ name: "login" });
                        callRequestsFromQueue(error, null);
                        reject(error);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }
        return Promise.reject(error);
    }
);

var showSnackbar = (snackbar) =>
    store.dispatch("snackBar/showSnackbar", snackbar);

const errorHandler = (error) => {
    if (error.response) {
        if (!error.response.data) {
            showSnackbar({
                text: error.message,
                color: "error",
            });
        } else {
            switch (error.response.status) {
                case 502:
                case 404:
                case 500: {
                    showSnackbar({
                        text: error.response.statusText,
                        color: "error",
                    });
                    break;
                }
                default: {

                    const _error = error.response.data.message;
                    if (typeof _error === "object") {
                        for (let message of _error) {
                            showSnackbar({
                                text: message,
                                color: "error",
                            });
                        }
                        // Object.keys(_error).forEach((key) => {
                        //     _error[key].forEach((message) => {
                        //         showSnackbar({
                        //             text: message,
                        //             color: "error",
                        //         });
                        //     });
                        // });
                    } else {
                        showSnackbar({
                            text: _error,
                            color: "error",
                        });
                    }
                }
            }
        }
    }
};
export default (
    method,
    url,
    {
        headers = {},
        params = {},
        data = {},
        onSuccess = null,
        onFailure = null,
        onFinally = null,
        responseType = "json",
        onUploadProgress = null,
        onDownloadProgress = null,
        isTokenRequired = true,
        cancel = false,
    } = {}
) => {
    const methods = ["get", "post", "patch", "put", "delete"];
    if (!methods.includes(method)) return `Method ${method} not allowed.`;
    if (!url) return "url is required";

    const config = {
        method,
        url,
        headers,
        params,
        data,
        responseType,
        onUploadProgress,
        onDownloadProgress,
    };
    if (cancel) {
        source.cancel();
        source = axios.CancelToken.source();
        config.cancelToken = source.token;
    }

    if (isTokenRequired) {
        const { accessToken } = authToken.getToken();
        headers["authorization"] = `Bearer ${accessToken}`;
    }

    return axios(config)
        .then((response) => {
            if (onSuccess != null) {
                onSuccess(response);
            }
        })
        .catch((error) => {
            if (onFailure != null) {
                onFailure(error.response);
            } else errorHandler(error);
        })
        .finally(() => {
            if (onFinally != null) {
                onFinally();
            }
        });
};
