const Timeseries = require('../../src/infrastructure/timeseries');

let timeseries;

beforeAll(async () => {
  timeseries = Timeseries();
});

test('Adding values to timeseries data structure works', async () => {
  timeseries.addValue('test', 1);
  timeseries.addValue('test', 2);
  timeseries.addValue('mock', 5);

  expect(timeseries.getValues()).toStrictEqual([
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

  expect(timeseries.getTimestamps()).toStrictEqual(expect.any(Array));
  expect(timeseries.getTimestamps()).toHaveLength(3);
});

test('Adding more values to timeseries data structure works', async () => {
  const currentTimestamp = Date.now();

  timeseries.addValue('test', 3);

  expect(timeseries.getValues()).toStrictEqual([
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

  expect(timeseries.getTimestamps()[3]).toBe(currentTimestamp);
});

test('getSum returns the summation of only the desired metric', async () => {
  expect(timeseries.getSumFromLastHour('test')).toBe(6);
});

test('getSum returns the summation of records from the last hour only', async () => {
  const currentTimestamp = Date.now();
  const FORTY_MINUTES = 40 * 60 * 1000;

  const dateNowSpy = jest.spyOn(global.Date, 'now');
  dateNowSpy
    .mockImplementationOnce(() => currentTimestamp + FORTY_MINUTES)
    .mockImplementationOnce(() => currentTimestamp + FORTY_MINUTES * 2)
    .mockImplementationOnce(() => currentTimestamp + FORTY_MINUTES * 2);
  timeseries.addValue('test', 10);
  timeseries.addValue('test', 10);

  expect(timeseries.getSumFromLastHour('test')).toBe(20);
  dateNowSpy.mockRestore();
});

// beware on writing new tests since the last test modified the Date.now()
// and timestamps being sorted in ascending order is critical
