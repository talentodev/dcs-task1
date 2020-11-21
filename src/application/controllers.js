const { Timeseries, getSumFromLastHour } = require('../domain/timeseries');
const PostMetricsDto = require('../domain/postMetricsDto');

const Error = (message, method, params, body) => {
  console.error(Date() + '(' + Date.now() + ')');
  console.error('Method: ' + method);
  console.error('Message: ' + message);
  process.stderr.write('With params: ');
  console.error(params);
  process.stderr.write('With body: ');
  console.error(body);
  console.error();
};

const MetricsController = () => {
  /**
   * @api {get} /metric/:key/sum Metric Sum
   * @apiName GetMetricSum
   * @apiGroup Metrics
   * @apiDescription Returns the sum of all values added in the last hour for the given key
   * @apiExample Example:
   *     http://localhost:5000/metric/abcdefg/sum
   *
   * @apiParam (Request param) {String} key Key to get the sum
   *
   * @apiSuccess {Integer} sum Sum of all values added in the last hour for the given key
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "sum": 5,
   *     }
   */
  const getMetricSum = (req, res) => {
    try {
      const sum = getSumFromLastHour(req.params.key);

      return res.status(200).json({ sum });
    } catch (err) {
      Error(err);
      return res.status(500).json({ msg: err });
    }
  };

  /**
   * @api {post} /metric/:key Add Metric Value
   * @apiName PostMetric
   * @apiGroup Metrics
   * @apiDescription Add a new value for the given key
   * @apiExample Example:
   *     http://localhost:5000/metric/abcdefg
   *
   * @apiParam (Request param) {String} key Key to get the sum
   * @apiParam (Request body) {Number} value Value of the metric (floats will be rounded to the nearest integer)
   * @apiParamExample {json} Request-Example:
   *     {
   *          "value": 50
   *     }
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "msg": "field 'value' must be a number"
   *     }
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "msg": "field 'value' is required"
   *     }
   */
  const postMetric = (req, res) => {
    try {
      const dto = new PostMetricsDto(req.params.key, req.body.value);

      Timeseries().addValue(dto);

      return res.status(200).json();
    } catch (err) {
      Error(err, 'postMetric', req.params, req.body);
      return res.status(400).json({ msg: err });
    }
  };

  return {
    getMetricSum,
    postMetric,
  };
};

module.exports = MetricsController;
