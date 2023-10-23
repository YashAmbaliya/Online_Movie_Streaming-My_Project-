import axios from "axios";
import {loginStart, loginSuccess, loginFailure} from "./AuthAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
        console.log(res.data);
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data);
        dispatch(loginFailure());
        // if(error.response){
        //     dispatch(loginFailure(error.response));
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // }
    }
};