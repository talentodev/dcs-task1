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
  }

  const postMetric = async (req, res) => {
    try {
      const key = req.params.key;
      const value = req.body.value;

      Timeseries().addValue(key, value);

      const values = Timeseries().getValues();
      const timestamps = Timeseries().getTimestamps();

      return res.status(200).json({ values, timestamps });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  return {
    getMetricSum,
    postMetric
  };
};

module.exports = MetricsController;
