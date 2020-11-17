const {
  Timeseries,
  getSumFromLastHour,
} = require('../../infrastructure/timeseries');
const PostMetricsDto = require('../../domain/postMetricsDto');

const MetricsController = () => {
  const getMetricSum = (req, res) => {
    try {
      const sum = getSumFromLastHour(req.params.key);

      return res.status(200).json({ sum });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const postMetric = (req, res) => {
    try {
      const dto = new PostMetricsDto(req.params.key, req.body.value);

      Timeseries().addValue(dto);

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  };

  return {
    getMetricSum,
    postMetric,
  };
};

module.exports = MetricsController;
