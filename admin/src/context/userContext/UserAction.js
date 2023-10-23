export const getUserStart = () => ({
    type: "GET_USER_START",
});

export const getUserSuccess = (user) => ({
    type: "GET_USER_SUCCESS",
    payload: user,
});

export const getUserFailure = () => ({
    type: "GET_USER_FAILURE",
});

export const createUserStart = () => ({
    type: "CREATE_USER_START",
});

export const createUserSuccess = (user) => ({
    type: "CREATE_USER_SUCCESS",
    payload: user,
});

export const createUserFailure = () => ({
    type: "CREATE_USER_FAILURE",
});

export const updateUserStart = () => ({
    type: "UPDATE_USER_START",
});

export const updateUserSuccess = (user) => ({
    type: "UPDATE_USER_SECCESS",
    payload: user,
});

export const updateUserFailure = () => ({
    type: "UPDATE_USER_FAILURE",
});

export const deleteUserStart = () => ({
    type: "DELETE_USER_START",
});

export const deleteUserSuccess = (id) => ({
    type: "DELETE_USER_SUCCESS",
    payload: id,
});

export const deleteUserFailure = () => ({
    type: "DELETE_USER_FAILURE",
});