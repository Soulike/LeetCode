/*
 * @lc app=leetcode id=1344 lang=javascript
 *
 * [1344] Angle Between Hands of a Clock
 */

// @lc code=start
/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
const angleClock = function (hour, minutes) {
  const anglePerCircle = 360;
  const hoursPerCircle = 12;
  const anglePerHour = anglePerCircle / hoursPerCircle;
  const minutesPerHour = 60;

  const hourAngle =
    ((hour % hoursPerCircle) + minutes / minutesPerHour) * anglePerHour;
  const minutesAngle = (minutes / minutesPerHour) * anglePerCircle;

  const diff = Math.abs(hourAngle - minutesAngle);
  return Math.min(diff, anglePerCircle - diff);
};
// @lc code=end
