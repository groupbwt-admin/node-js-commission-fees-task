/**
 * Determine the number of the week of the year, based on the date received.
 *
 * @param date
 * @returns {number}
 */
const getWeekNumberByDate = (date) => {
  // Create a copy of this date object
  const target = new Date(date);
  // ISO week date weeks start on Monday, so correct the day number
  const dayNr = (target.getDay() + 6) % 7;
  // ISO 8601 states that week 1 is the week with the first Thursday of that year
  // Set the target date to the Thursday in the target week
  target.setDate(target.getDate() - dayNr + 3);
  // Store the millisecond value of the target date
  const firstThursday = target.valueOf();
  // Set the target to the first Thursday of the year
  // First, set the target to January 1st
  target.setMonth(0, 1);
  // Not a Thursday? Correct the date to the next Thursday
  if (target.getDay() !== 4) {
    // eslint-disable-next-line no-mixed-operators
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  // The week number is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

// eslint-disable-next-line import/prefer-default-export
export { getWeekNumberByDate };
