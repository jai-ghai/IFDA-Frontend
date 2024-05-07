
import { server } from '../store';
import axios from 'axios';



export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login";
    // localStorage.removeItem('token');
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};


// export const buyPayment = () => async dispatch => {
//   try {
//     dispatch({ type: 'buyCourseRequest' });

//     const { data } = await axios.get(`${server}/purchase`, {
//       withCredentials: true,
//     });

//     dispatch({ type: 'buyCourseSuccess', payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: 'buyCourseFail',
//       payload: error.response.data.message,
//     });
//   }
// };



export const buyPayment = (userId, courseId) => async dispatch => {
  try {
    dispatch({ type: 'buyCourseRequest' });

    const { data } = await axios.post(
      `${server}/purchase`,
      { userId, courseId }, // Corrected parameter name
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'buyCourseSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'buyCourseFail', payload: error.response.data.message });
  }
};


export const fetchUserData = userId => async dispatch => {
  try {

    const response = await axios.get(`${server}/users/${userId}`);

    if (response.status === 200) {
      const userData = response.data;
      return userData; // Return the fetched user data
    } else {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};
