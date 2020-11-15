const Timeseries = require('../../infrastructure/timeseries');

const MetricsController = () => {
  const getMetricSum = async (req, res) => {
    try {
      const result = Timeseries().getValues();

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const postMetric = async (req, res) => {
    try {
      const {
        params: { key },
        body: { value },
      } = req;

      Timeseries().addValue(key, value);

      const values = Timeseries().getValues();
      const timestamps = Timeseries().getTimestamps();
      const sum = Timeseries().getSumFromLastHour(key);

      return res.status(200).json({ values, timestamps, sum });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getMetricSum,
    postMetric,
  };
};

module.exports = MetricsController;
