import { instance } from '../redux/auth/operations';

const apiRequest = async (
  method,
  url,
  data = null
  // params = null,
  // headers = null
) => {
  try {
    const response = await instance({
      method,
      url,
      data,
      // params,
      // headers,
    });

    console.log(`Request: ${method.toUpperCase()} ${url}`, {
      data,
      //   params,
      //   headers,
    });
    console.log('Response:', response.data);

    return { data: response.data, error: null };
  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad Request.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in.';
          break;
        case 403:
          errorMessage = 'Forbidden.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error.';
          break;
        default:
          errorMessage = error.response.data.message || 'Server error.';
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Please try again later.';
    } else {
      errorMessage = error.message;
    }

    console.error('Error:', errorMessage);
    return { data: null, error: errorMessage };
  }
};

export default apiRequest;
