import fetchUtils from './fetchUtils';

export default {
  login: async (email, password) => {
    try {
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/user/login',
        { email, password },
      );

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  signUp: async (email, first_name, last_name, password) => {
    try {
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/user/signup',
        {email, first_name, last_name, password},
      );

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
