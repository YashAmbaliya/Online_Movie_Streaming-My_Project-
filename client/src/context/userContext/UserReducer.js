const UserReducer = (state, action) => {
    switch(action.type){
        case "GET_USER_START":
            return{
                user: [],
                isFetching: true,
                error: false,
            };
        case "GET_USER_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USER_FAILURE":
            return{
                user: [],
                isFetching: false,
                error: true,
            };
        case "CREATE_USER_START":
            return{
                ...state,
                isFetching: true,
                error: false,
            };
        case "CREATE_USER_SUCCESS":
            return{
                user: [...state.user, action.payload],
                isFetching: false,
                error: false,
            };
        case "CREATE_USER_FAILURE":
            return{
                ...state,
                isFetching: false,
                error: true,
            };
        case "UPDATE_USER_START":
            return{
                ...state,
                isFetching: true,
                error: false,
            };
        case "UPDATE_USER_SECCESS":
            return{
                user: state.user.map(
                    (user) => user._id === action.payload._id && action.payload
                ),
                isFetching: false,
                error: false,
            };
        case "UPDATE_USER_FAILURE":
            return{
                ...state,
                isFetching: false,
                error: true,
            };
        case "DELETE_USER_START":
            return{
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_USER_SUCCESS":
            return{
                user: state.user.filter((user) => user._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_USER_FAILURE":
            return{
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return{...state};
    }
};

export default UserReducer;