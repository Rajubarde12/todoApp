import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../type';

type InitialState = {
  screens: {
    prev: string;
    next: string;
  };
  user: User | null;
  loading: boolean;
  error: string | null;
  todoTask: any;
};

const initialState: InitialState = {
  screens: {
    prev: '',
    next: '',
  },
  user: null,
  loading: false,
  error: null,
  todoTask: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setScreens: (state, action) => ({
      ...state,
      screens: action.payload,
    }),
    loginRequest: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,
    }),
    loginError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    todoTaskRequest: (state, action) => {
      return {...state, loading: true};
    },
    todoTaskSuccess: (state, action) => {
      return {...state, loading: false, todoTask: action.payload};
    },
    todoTaskError: (state, action) => {
      return {...state, loading: false, error: action.payload};
    },
  },
});

// export const {setScreens, loginRequest, loginSuccess, loginError, setUser} =
//   todoSlice.actions;
export default todoSlice.reducer;
