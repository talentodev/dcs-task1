const MetricsController = () => {
  const getMetricSum = async (req, res) => {
    try {
      const users = "teste";

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const postMetric = async (req, res) => {
    try {
      const users = "teste";

      return res.status(200).json({ users });
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
