/*
 * @lc app=leetcode id=1239 lang=javascript
 *
 * [1239] Maximum Length of a Concatenated String with Unique Characters
 */

// @lc code=start
/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  /** @type {Set<string>} */
  const currentCharSet = new Set();
  let maxUniqueLength = 0;

  /**
   * @param {number} index
   * @returns {void}
   */
  const backtrack = (index) => {
    if (index === arr.length) {
      maxUniqueLength = Math.max(maxUniqueLength, currentCharSet.size);
    } else {
      const str = arr[index];
      const strCharSet = new Set(str);
      const isUniqueStr = str.length === strCharSet.size;
      if (isUniqueStr && !hasIntersection(currentCharSet, strCharSet)) {
        for (const c of str) {
          currentCharSet.add(c);
        }
        backtrack(index + 1);
        for (const c of str) {
          currentCharSet.delete(c);
        }

        backtrack(index + 1);
      } else {
        backtrack(index + 1);
      }
    }
  };

  backtrack(0);
  return maxUniqueLength;
};

/**
 * @template T
 * @param {Set<T>} set1
 * @param {Set<T>} set2
 * @returns {boolean}
 */
function hasIntersection(set1, set2) {
  for (const element of set1) {
    if (set2.has(element)) {
      return true;
    }
  }
  return false;
}
// @lc code=end
