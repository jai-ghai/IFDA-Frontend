import { server } from '../store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const getCourseModules = id => async dispatch => {
  try {
    dispatch({ type: 'getModuleRequest' });

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getModuleSuccess', payload: data.modules });
  } catch (error) {
    dispatch({
      type: 'getModuleFail',
      payload: error.response.data.message,
    });
  }
};



// export const submitTestScore = (userId, moduleId, score) => async dispatch => {
//   dispatch({ type: 'submitTestRequest' }); // Dispatch the request action

//   try {
//     const response = await axios.post(`${server}/user/${userId}/test-score`, { moduleId, score });
//     const { data } = response;

//     // Dispatch success action
//     dispatch({
//       type: 'submitTestSuccess',
//       payload: data,
//     });
//   } catch (error) {
//     // Dispatch failure action
//     dispatch({
//       type: 'submitTestFail',
//       payload: error.response.data.message, // Assuming the error message is provided in the response data
//     });
//   }
// };


export const submitTestScore = (userId, result) => async (dispatch) => {
  // Dispatch the request action
  dispatch({ type: 'submitTestRequest' });

  try {
    // Set up the request configuration
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    // Make the POST request to submit the test score
    const response = await axios.post(
      `${server}/user/${userId}/test-score`,
      result,
      config
    );

    // Extract the data from the response
    const { data } = response;

    // Dispatch success action with the received data
    dispatch({
      type: 'submitTestSuccess',
      payload: data,
    });

    return data;
  } catch (error) {
    // If an error occurs, dispatch failure action with the error message
    dispatch({
      type: 'submitTestFail',
      payload: error.response.data.message,
    });

    throw new Error(error.response.data.message);
  }
};
