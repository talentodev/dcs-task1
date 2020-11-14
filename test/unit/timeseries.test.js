const Timeseries = require('../../src/infrastructure/timeseries');

/**
 * works
 *
 * subsequent works
 *
 */

test('Adding values to timeseries data structure works', async () => {
  Timeseries().addValue('test', 1);
  Timeseries().addValue('test', 2);
  Timeseries().addValue('mock', 5);

  expect(Timeseries().getValues()).toStrictEqual([
    {
      test: 1,
    },
    {
      test: 2,
    },
    {
      mock: 5,
    },
  ]);

  expect(Timeseries().getTimestamps()).toStrictEqual(expect.any(Array));
  expect(Timeseries().getTimestamps()).toHaveLength(3);
});

test('Adding more values to timeseries data structure works', async () => {
  const currentTimestamp = Date.now();

  Timeseries().addValue('test', 3);

  expect(Timeseries().getValues()).toStrictEqual([
    {
      test: 1,
    },
    {
      test: 2,
    },
    {
      mock: 5,
    },
    {
      test: 3,
    },
  ]);

  expect(Timeseries().getTimestamps()[3]).toBe(currentTimestamp);
});
