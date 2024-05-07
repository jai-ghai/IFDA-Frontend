// import { json } from 'react-router-dom';
import toast from 'react-hot-toast';
import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      config
    );

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const createModule = (courseId, title) => async dispatch => {
  try {
    dispatch({ type: 'createModuleRequest' });

    const { data } = await axios.post(`${server}/course/${courseId}/modules`, { title }, {
      withCredentials: true,
    });

    dispatch({ type: 'createModuleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createModuleFail',
      payload: error.response.data.error,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/course/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

// export const addLecture = (courseId, moduleId, formDataObject) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json', // Change content type to JSON
//       },
//       withCredentials: true,
//     };

//     dispatch({ type: 'addLectureRequest' });

//     // Appending the key to the formdata object
//     const { data } = await axios.post(
//       `${server}/course/${courseId}/modules/${moduleId}/lectures`,
//       formDataObject, // Pass the object directly
//       config
//     );


//     dispatch({ type: 'addLectureSuccess', payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: 'addLectureFail',
//       payload: error.response.data.message,
//     });
//   }
// };
export const createTest = (courseId, moduleId, questions) => async (dispatch) => {
  console.log(questions);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Change content type to JSON
      },
      withCredentials: true,
    };

    dispatch({ type: 'addTestRequest' });
    questions = JSON.stringify(questions);

    // Appending the key to the formdata object
    const { data } = await axios.post(
      `${server}/course/${courseId}/modules/${moduleId}/test`,
      questions, // Pass the object directly
      config
    );


    dispatch({ type: 'addTestSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addTestFail',
      payload: error.response.data.message,
    });
  }
};



export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      config
    );

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(`${server}/admin/users`, config);

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });

    const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, config);

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};







export const addLecture = (courseId, moduleId, myForm) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Change content type to JSON
      },
      withCredentials: true,
    };

    dispatch({ type: 'addLectureRequest' });
    const key = await dispatch(requestPresignedUrl(myForm.file));


    myForm.key = key;
    myForm.file = null;

    // Appending the key to the formdata object
    const { data } = await axios.post(
      `${server}/course/${courseId}/modules/${moduleId}/lectures`,
      myForm, // Pass the object directly
      config
    );

    await dispatch({
      type: 'addLectureSuccess',
      payload: data.message,
    });

    dispatch({ type: 'addLectureComplete' });

    toast.success('Lecture added successfully.');
  } catch (error) {
    console.error('Error adding lecture:', error);
    toast.error('Error adding lecture. Please try again.');
    dispatch({ type: 'addLectureFail', payload: error.message });
  }
};

export const requestPresignedUrl = file => async dispatch => {
  try {
    const response = await axios.post(
      `${server}/generate-presigned-url`,
      {
        file_name: file.name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const { presignedUrl, key } = response.data;

    await dispatch(uploadFileToPresignedUrl(file, presignedUrl));

    return key;
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    toast.error('Error fetching presigned URL. Please try again.');
    throw error;
  }
};

export const uploadFileToPresignedUrl = (file, url) => async () => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) throw new Error('Failed to upload file.');

    toast.success('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    toast.error('Error uploading file. Please try again.');
    throw error;
  }
};



// update course
export const updateCourse = (updatedCourse) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST });
    
    // Perform the API request to update the course
    const response = await axios.put(`/api/courses/${updatedCourse._id}`, updatedCourse);

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};