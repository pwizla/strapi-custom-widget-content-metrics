module.exports = [
  {
    method: 'GET',
    path: '/count',
    handler: 'metrics.getContentCounts',
    config: {
      policies: [],
    },
  },
];