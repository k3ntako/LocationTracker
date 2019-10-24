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
        '192.168.0.143:3000/api/run/start',
        {
          name,
          latitude,
          longitude,
          user_id: 'db8b6923-bc67-4e0e-856c-8ca71a3ddb7e',
          time: Date.now(),
        },
      );

      return response.run_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  recordPoint: async ({latitude, longitude}) => {
    try {
      const response = await fetchUtils.post(
        '192.168.0.143:3000/api/run/record',
        {
          latitude,
          longitude,
          time: Date.now(),
        },
      );

      return response.run_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  getRun: async (run_id, afterTime) => {
    try {
      const response = await fetchUtils.get('192.168.0.143:3000/api/run', {
        run_id,
        afterTime,
      });

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
