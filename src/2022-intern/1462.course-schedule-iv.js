/*
 * @lc app=leetcode id=1462 lang=javascript
 *
 * [1462] Course Schedule IV
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  /** @type {boolean[][]} */
  const courseMatrix = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    courseMatrix[i] = new Array(numCourses);
    courseMatrix[i].fill(false);
  }
  for (const [course1, course2] of prerequisites) {
    courseMatrix[course1][course2] = true;
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < numCourses; i++) {
      for (let j = 0; j < numCourses; j++) {
        if (courseMatrix[i][j]) {
          for (let k = 0; k < numCourses; k++) {
            if (courseMatrix[j][k]) {
              if (!courseMatrix[i][k]) {
                changed = true;
              }
              courseMatrix[i][k] = true;
            }
          }
        }
      }
    }
  }

  /** @type {boolean[]} */
  const result = [];
  for (const [course1, course2] of queries) {
    result.push(courseMatrix[course1][course2]);
  }
  return result;
};
// @lc code=end
