module.exports = {
  name: 'MyApp',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.REACT_APP_API,
  },
  ios: {
    bundleIdentifier: 'com.company.name',
  },
};
