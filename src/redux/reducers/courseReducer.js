import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], modules: [] },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.modules = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getModuleRequest: state => {
      state.loading = true;
    },
    getModuleSuccess: (state, action) => {
      state.loading = false;
      state.modules = action.payload;
    },
    getModuleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

     // Test reducer
     submitTestRequest: state => {
      state.loading = true;
    },
    submitTestSuccess: (state, action) => {
      state.loading = false;
      state.testResult = action.payload;
    },
    submitTestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
