/*
 * @lc app=leetcode id=735 lang=javascript
 *
 * [735] Asteroid Collision
 */

// @lc code=start
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  /** @type {number[]} */
  const stack = [];

  for (const asteroid of asteroids) {
    if (stack.length === 0) stack.push(asteroid);
    else if (stack[stack.length - 1] > 0 && asteroid < 0) {
      let topAsteroid = asteroid;
      while (
        stack.length > 0 &&
        stack[stack.length - 1] > 0 &&
        topAsteroid < 0
      ) {
        const collidedAsteroid = getCollidedAsteroid(
          stack[stack.length - 1],
          topAsteroid,
        );
        stack.pop();
        topAsteroid = collidedAsteroid;
      }
      if (topAsteroid !== 0) stack.push(topAsteroid);
    } else stack.push(asteroid);
  }

  return stack;
};

/**
 * @param {number} asteroid1
 * @param {number} asteroid2
 * @returns {number}
 */
function getCollidedAsteroid(asteroid1, asteroid2) {
  const absAsteroid1 = Math.abs(asteroid1);
  const absAsteroid2 = Math.abs(asteroid2);

  if (absAsteroid1 > absAsteroid2) return asteroid1;
  else if (absAsteroid1 < absAsteroid2) return asteroid2;
  else return 0;
}
// @lc code=end
