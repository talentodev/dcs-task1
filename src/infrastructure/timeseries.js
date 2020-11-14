/**
 * two arrays
 *
 * the first consists of a series of timestamps indexed by incrementing int
 * the second is paired with the first by index
 *      each item is an object which indexes corresponds to the metrics name
 *      and the value is an array containing all values sent to the structure
 *      at the corresponding timestamp
 *
 */

const Timeseries = () => {
  if (typeof this.values === 'undefined') {
    this.values = [];
    this.timestamps = [];
  }

  const addValue = (key, value) => {
    const index = this.timestamps.push(Date.now()) - 1;

    if (typeof this.values[index] === 'undefined') {
      this.values[index] = {};
    }
    this.values[index][key] = value;
  };

  const getValues = () => this.values;
  const getTimestamps = () => this.timestamps;

  return {
    addValue,
    getValues,
    getTimestamps,
  };
};

module.exports = Timeseries;
