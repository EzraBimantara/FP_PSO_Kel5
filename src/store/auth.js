import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        };
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },
        setUserLogout(state) {
            state.token = null;
            state.userLogin = {};
            state.isLogin = false;
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        },
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkeyRegister = import.meta.env.VITE_FIREBASE_API_KEY_REGISTER;
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

            try {
                const { data } = await axios.post(authUrl + APIkeyRegister, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });

                const newUserData = {
                    userId: data.localId,
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink,
                };

                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);
            } catch (err) {
                console.log("Register error:", err.response?.data || err.message);
            }
        },

        async addNewUser({ commit, state }, payload) {
            try {
                await axios.post(
                    `https://timedoorezra-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
                    payload
                );
                commit("setUserLogin", { userData: payload, loginStatus: true });
            } catch (err) {
                console.log("Add user error:", err.response?.data || err.message);
            }
        },

        async getLoginData({ commit, dispatch }, payload) {
            const APIkeyLogin = import.meta.env.VITE_FIREBASE_API_KEY_LOGIN;
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

            try {
                const { data } = await axios.post(authUrl + APIkeyLogin, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });

                const user = await dispatch("getUser", data.localId);
                return user; 
            } catch (err) {
                console.log("Login error:", err.response?.data || err.message);
                return null; 
            }
        },

        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://timedoorezra-default-rtdb.firebaseio.com/user.json`
                );

                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin", {
                            userData: data[key],
                            loginStatus: true,
                        });
                        return data[key]; 
                    }
                }
                return null; 
            } catch (err) {
                console.log("Get user error:", err.response?.data || err.message);
                return null;
            }
        },
    },
};