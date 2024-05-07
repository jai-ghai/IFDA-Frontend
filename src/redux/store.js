import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
  paymentReducer,
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    payment: paymentReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;

// export const server = 'https://course-backend-eight.vercel.app/api/v1';
// export const server = 'http://localhost:4000/api/v1';
// export const server = 'https://tired-ant-overcoat.cyclic.app/api/v1';
// export const server = 'https://lms-backend-woad.vercel.app/';
export const server = 'https://lms.ifda.in/api/v1';
