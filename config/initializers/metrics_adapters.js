module.exports = (process) => {
  return [
    {
      name: 'GoogleAnalytics',
      environments: ['development', 'production'],
      config: {
        id: 'UA-94075514-1'
      }
    }
  ];
};
