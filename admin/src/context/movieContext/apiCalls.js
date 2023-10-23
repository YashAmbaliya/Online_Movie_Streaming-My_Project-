import axios from "axios";
import {
    getMovieStart,
    getMovieSuccess,
    getMoviesFailure,
    createMovieStart,
    createMovieSuccess,
    createMovieFailure,
    updateMovieStart,
    updateMovieSuccess,
    updateMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure
} from "./MovieAction";

// Get Movies
export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("/movies", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getMovieSuccess(res.data));
    } catch (error) {
        dispatch(getMoviesFailure());
    }
};

//Create Movies
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post("/movies", movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createMovieSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(createMovieFailure());
    }
};

// Update Movie
export const updateMovie = async (id, movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put("/movies/" + id, movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateMovieSuccess(res.data));
    } catch (error) {
        dispatch(updateMovieFailure());
    }

};

//Delete Movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("/movies/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteMovieSuccess(id));
    } catch (error) {
        dispatch(deleteMovieFailure());
    }
};