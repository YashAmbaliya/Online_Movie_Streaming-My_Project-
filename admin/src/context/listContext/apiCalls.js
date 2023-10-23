import axios from "axios";
import {
    createListStart,
    createListSuccess,
    createListFailure,
    getListsStart,
    getListsSuccess,
    getListsFailure,
    updateListStart,
    updateListSuccess,
    updateListFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
} from "./ListActions";

//Get List
export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/lists", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
};

//Create
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/lists", list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createListSuccess(res.data));
    } catch (error) {
        dispatch(createListFailure());
    }
};

//Delete
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteListSuccess(id));
    } catch (error) {
        dispatch(deleteListFailure());
    }
};

//Update
export const updateList = async (id, list, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put("/lists/" + id, list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,             
            },
        });
        dispatch(updateListSuccess(res.data));
    } catch (error) {
        dispatch(updateListFailure());
    }
};