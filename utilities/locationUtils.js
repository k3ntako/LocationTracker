import fetchUtils from './fetchUtils';

export default {
  sendLocation: async ({latitude, longitude}) => {
    try {
      await fetchUtils.post('', {latitude, longitude});
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
