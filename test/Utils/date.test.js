import assert from 'assert';
import { getWeekNumberByDate } from '../../src/Utils/date.js';

describe('Date util tests', () => {
  it('Determining the first day of the week', () => {
    const now = new Date('2021-03-08');
    assert.strictEqual(getWeekNumberByDate(now), 10);
  });
  it('Determining the last day of the week', () => {
    const now = new Date('2021-03-14');
    assert.strictEqual(getWeekNumberByDate(now), 10);
  });
  it('Determining the first and last days of the year', () => {
    const now = new Date('2020-12-31');
    const now2 = new Date('2021-01-01');
    assert.strictEqual(getWeekNumberByDate(now), getWeekNumberByDate(now2));
  });
});
