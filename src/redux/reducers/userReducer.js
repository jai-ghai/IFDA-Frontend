import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
  {
    // Initial state goes here
    // loading: false,
    // isAuthenticated: false,
    // user: null,
    // error: null,
    // message: null,
  },
  (builder) => {
    builder
      .addCase('loginRequest', (state) => {
        state.loading = true;
      })
      .addCase('loginSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase('loginFail', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase('clearError', (state) => {
        state.error = null;
      })
      .addCase('clearMessage', (state) => {
        state.message = null;
      });
  }
  
);
