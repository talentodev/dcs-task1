const PostMetricsDto = require('../src/domain/postMetricsDto');

test('dto should throw exception for invalid inputs', () => {
  expect(() => {
    new PostMetricsDto('test', NaN);
  }).toThrow();
  expect(() => {
    new PostMetricsDto('test', 'abc');
  }).toThrow();
  expect(() => {
    new PostMetricsDto('test', '5.a1');
  }).toThrow();
  expect(() => {
    new PostMetricsDto('test', undefined);
  }).toThrow();
  expect(() => {
    new PostMetricsDto('test', [1]);
  }).toThrow();
});

test('dto should round to the nearest integer', () => {
  let dto = new PostMetricsDto('test', 5.5);
  expect(dto.getValue()).toBe(6);

  dto = new PostMetricsDto('test', 5.1);
  expect(dto.getValue()).toBe(5);
});
