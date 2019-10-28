import fetchUtils from './fetchUtils';

const validateCoordinates = coordinates => {
  const {latitude, longitude} = coordinates;
  return typeof latitude === 'number' && typeof longitude === 'number';
};

export default {
  startRun: async (name, coordinates, user_id) => {
    try {
      if (!validateCoordinates) {
        throw new Error('Invalid coordinates');
      } else if (!name.trim()) {
        throw new Error('Invalid name');
      } else if (!user_id) {
        throw new Error('Invalid user ID');
      }

      const {latitude, longitude} = coordinates;
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/run/start',
        {
          name,
          latitude,
          longitude,
          user_id,
          time: Date.now(),
        },
      );

      return response.run_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  recordPoint: async ({latitude, longitude}, run_id) => {
    try {
      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/run/record',
        {
          latitude,
          longitude,
          time: Date.now(),
          run_id
        },
      );

      return response.run_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  getRun: async (run_id, lastUpdate = null) => {
    try {
      const lastUpdateQuery = lastUpdate ? `?lastupdate=${lastUpdate}` : ''
      const response = await fetchUtils.get('https://location-tracker25.herokuapp.com/api/run/' + run_id + lastUpdateQuery);

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
