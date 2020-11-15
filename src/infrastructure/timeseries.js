const bs = require('binarysearch');

const Timeseries = () => {
  if (typeof this.values === 'undefined') {
    this.values = [];
    this.timestamps = [];
  }

  const getValues = () => this.values;
  const getTimestamps = () => this.timestamps;

  const addValue = (key, value) => {
    const index = this.timestamps.push(Date.now()) - 1;

    if (typeof this.values[index] === 'undefined') {
      this.values[index] = {};
    }
    this.values[index][key] = value;
  };

  const pruneValues = () => {
    const ONE_HOUR = 60 * 60 * 1000;
    const lastHourTimestamp = Date.now() - ONE_HOUR;
    const startIndex = findFirstIndexAfterTimestamp(
      getTimestamps(),
      lastHourTimestamp
    );

    this.values = this.values.slice(startIndex);
    this.timestamps = this.timestamps.slice(startIndex);
  };

  return {
    getValues,
    getTimestamps,
    addValue,
    pruneValues,
  };
};

const getSumFromLastHour = (key) => {
  const ONE_HOUR = 60 * 60 * 1000;
  const lastHourTimestamp = Date.now() - ONE_HOUR;
  const values = Timeseries().getValues();
  const timestamps = Timeseries().getTimestamps();
  const startIndex = findFirstIndexAfterTimestamp(
    timestamps,
    lastHourTimestamp
  );

  let sum = 0;
  for (i = startIndex; i < values.length; i++) {
    if (typeof values[i][key] !== 'undefined') {
      sum += values[i][key];
    }
  }
  return sum;
};

const findFirstIndexAfterTimestamp = (haystack, needle) => {
  let index = bs(haystack, needle);
  if (index === -1) {
    // there isn't the timestamp we want; find the first timestamp latter than needle
    index = bs.closest(haystack, needle);
    if (haystack[index] < needle) {
      index += 1;
    }
  }
  return index;
};

module.exports = {
  Timeseries,
  getSumFromLastHour,
  findFirstIndexAfterTimestamp,
};
