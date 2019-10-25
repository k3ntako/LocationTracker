import fetchUtils from './fetchUtils';

const validateCoordinates = coordinates => {
  const { latitude, longitude } = coordinates;
  return typeof latitude === 'number' && typeof longitude === 'number';
};

export default {
  login: async (email, password) => {
    try {
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/user/login',
        { email, password },
      );

      return response.user_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  signUp: async (email, firstName, lastName, password, passwordConfirmation) => {
    try {
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/user/signup',
        {email, firstName, lastName, password, passwordConfirmation},
      );

      return response.user_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
