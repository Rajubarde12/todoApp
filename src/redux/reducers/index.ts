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
};

const initialState: InitialState = {
  screens: {
    prev: '',
    next: '',
  },
  user: null,
  loading: false,
  error: null,
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
  },
});

// export const {setScreens, loginRequest, loginSuccess, loginError, setUser} =
//   todoSlice.actions;
export default todoSlice.reducer;
