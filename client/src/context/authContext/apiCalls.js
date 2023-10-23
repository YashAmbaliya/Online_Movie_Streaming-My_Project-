import axios from "axios";
import {loginFailure, loginStart, loginSuccess} from "./AuthAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        dispatch(loginSuccess(res.data)); 
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data);
        dispatch(loginFailure());
    }
};