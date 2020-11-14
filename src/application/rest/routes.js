const routes = {
  'GET /metric/:key/sum': 'controllers.getMetricSum',
  'POST /metric/:key':    'controllers.postMetric',
};

module.exports = routes;
