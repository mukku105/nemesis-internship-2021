import {
  GET_USERS,
  ADD_USER,
  UPDATE_USERS,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  users: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id != action.payload.id) return user;
          return {
            ...user,
            name: action.payload.name,
            username: action.payload.username,
            email: action.payload.email,
            phone: action.payload.phone,
            website: action.payload.website,
          };
        }),
      };

    default:
      return state;
  }
}
