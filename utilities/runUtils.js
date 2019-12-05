import fetchUtils from './fetchUtils';

const validateCoordinates = coordinates => {
  const {latitude, longitude} = coordinates;
  return typeof latitude === 'number' && typeof longitude === 'number';
};

export default {
  createRun: async (user_id, name) => {
    try {
      if (!name || !name.trim()) {
        throw new Error('Invalid name');
      } else if (!user_id) {
        throw new Error('Invalid user ID');
      }

      const response = await fetchUtils.post(
        'https://location-tracker25.herokuapp.com/api/run/create',
        {
          name,
          user_id,
        },
      );

      return response.run_id;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  startRun: async (name, coordinates, user_id) => {
    try {
      if (!validateCoordinates) {
        throw new Error('Invalid coordinates');
      } else if (!name || !name.trim()) {
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
        `https://location-tracker25.herokuapp.com/api/run/${run_id}/record`,
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
  finishRun: async (run_id) => {
    try {
      const url = 'https://location-tracker25.herokuapp.com/api/run/' + run_id + '/finish'
      const response = await fetchUtils.post(url);

      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  config: (BackgroundGeolocation) =>  {
    return {
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 1,
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: false,
      url: '',
      batchSync: false,
      autoSync: false,
    }
  }
};
