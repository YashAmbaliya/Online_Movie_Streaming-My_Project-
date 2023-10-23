import axios from "axios";
import {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} from "./UserAction";

// Get Users
export const getUser = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/users", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailure());
    }
};

// Get Users By Id
export const getUserById = async (id, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/users/find/" + id , {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailure());
    }
};

// Create User
export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post("/users/admin", user, {
            headers: {
                token: "Bearer " +  JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createUserSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(createUserFailure());
    }
};

// Update User
export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put("/users/" + id, user, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        dispatch(updateUserFailure());
    }
};

// Delete User
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteUserSuccess(id));
    } catch (error) {
        dispatch(deleteUserFailure());
    }
};