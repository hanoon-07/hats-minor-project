import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //console.log(action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isCheckingAuth = false;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearAll: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    setIsCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
  },
});

// Export actions
export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  clearAll,
  setIsCheckingAuth,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
