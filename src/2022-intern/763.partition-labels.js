/*
 * @lc app=leetcode id=763 lang=javascript
 *
 * [763] Partition Labels
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[]}
 */
const partitionLabels = function (s) {
  /**
   * 某一组的最后一个字母的下标
   * @type {number[]} */
  const splitIndexes = [-1];

  /**
   * 某个字母的最后一个下标
   * @type {Map<string, number>}
   */
  const letterLastIndexes = new Map();

  for (let i = 0; i < s.length; i++) {
    letterLastIndexes.set(s[i], i);
  }

  for (let i = 0; i < s.length; i++) {
    // 新的一组
    if (i > splitIndexes[splitIndexes.length - 1]) {
      splitIndexes.push(i);
    }

    const letterLastIndex = letterLastIndexes.get(s[i]);
    // 扩充当前分组
    if (letterLastIndex > splitIndexes[splitIndexes.length - 1]) {
      splitIndexes[splitIndexes.length - 1] = letterLastIndex;
    }
  }

  const result = [];
  for (let i = 0; i < splitIndexes.length - 1; i++) {
    result.push(splitIndexes[i + 1] - splitIndexes[i]);
  }

  return result;
};
// @lc code=end
