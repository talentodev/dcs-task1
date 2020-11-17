const {
  Timeseries,
  getSumFromLastHour,
} = require('../../infrastructure/timeseries');
const { Error } = require('../../infrastructure/logger');
const PostMetricsDto = require('../../domain/postMetricsDto');

const MetricsController = () => {
  const getMetricSum = (req, res) => {
    try {
      const sum = getSumFromLastHour(req.params.key);

      return res.status(200).json({ sum });
    } catch (err) {
      Error(err);
      return res.status(500).json({ msg: err });
    }
  };

  const postMetric = (req, res) => {
    try {
      const dto = new PostMetricsDto(req.params.key, req.body.value);

      Timeseries().addValue(dto);

      return res.status(200).json();
    } catch (err) {
      Error(err, 'postMetric', req.params, req.body);
      return res.status(500).json({ msg: err });
    }
  };

  return {
    getMetricSum,
    postMetric,
  };
};

module.exports = MetricsController;
