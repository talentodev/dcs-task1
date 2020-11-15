const {
  Timeseries,
  findFirstIndexAfterTimestamp,
  getSumFromLastHour,
} = require('../../src/infrastructure/timeseries');

let timeseries;

beforeAll(async () => {
  timeseries = Timeseries();
});

test('findFirstIndexAfterTimestamp returns the proper index', async () => {
  const mockTimestamps = [3, 7, 9, 9, 50, 52];

  expect(findFirstIndexAfterTimestamp(mockTimestamps, 1)).toBe(0);
  expect(findFirstIndexAfterTimestamp(mockTimestamps, 3)).toBe(0);
  expect(findFirstIndexAfterTimestamp(mockTimestamps, 4)).toBe(1);
  expect(findFirstIndexAfterTimestamp(mockTimestamps, 9)).toBe(2);
  expect(findFirstIndexAfterTimestamp(mockTimestamps, 51)).toBe(5);
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
  expect(getSumFromLastHour('test')).toBe(6);
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

  expect(getSumFromLastHour('test')).toBe(20);
  dateNowSpy.mockRestore();
});

test('pruneValues removes any register added before last hour', async () => {
  const currentTimestamp = Date.now();
  const FORTY_MINUTES = 40 * 60 * 1000;

  const dateNowSpy = jest.spyOn(global.Date, 'now');
  dateNowSpy.mockImplementationOnce(() => currentTimestamp + FORTY_MINUTES * 2);

  timeseries.pruneValues();

  expect(timeseries.getValues()).toStrictEqual([
    {
      test: 10,
    },
    {
      test: 10,
    },
  ]);
  expect(timeseries.getTimestamps()).toStrictEqual(expect.any(Array));
  expect(timeseries.getTimestamps()).toHaveLength(2);

  dateNowSpy.mockRestore();
});
