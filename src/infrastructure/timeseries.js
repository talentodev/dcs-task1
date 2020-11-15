const bs = require('binarysearch');

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

  const findFirstIndexFromLastHour = () => {
    const ONE_HOUR = 60 * 60 * 1000;
    const lastHourTimestamp = new Date().getTime() - ONE_HOUR;

    let index = bs(this.timestamps, lastHourTimestamp);
    if (index === -1) {
      // there isn't the timestamp we want; find the first timestamp latter than lastHourTimestamp
      index = bs.closest(this.timestamps, lastHourTimestamp);
      if (this.timestamps[index] < lastHourTimestamp) {
        index += 1;
      }
    }
    return index;
  };

  const getSumFromLastHour = (key) => {
    const startIndex = findFirstIndexFromLastHour();

    let sum = 0;
    for (i = startIndex; i < this.values.length; i++) {
      if (typeof this.values[i][key] !== 'undefined') {
        sum += this.values[i][key];
      }
    }
    console.log(key, sum);
    return sum;
  };

  return {
    addValue,
    getValues,
    getTimestamps,
    getSumFromLastHour,
  };
};

module.exports = Timeseries;
