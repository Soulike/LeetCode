/*
 * @lc app=leetcode id=659 lang=javascript
 *
 * [659] Split Array into Consecutive Subsequences
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function (nums) {
  /**
   * numToFreq[num] 还剩下多少 num 可用
   * needNumSequenceCount[num] 有多少个序列下一个数字是 num
   *
   * 主要思路：能放进序列就放进序列，不能放进序列就自己独立成序列。如果无法独立成序列，返回 false
   */

  /** @type {number[]} */
  const numToFreq = [];
  /** @type {number[]} */
  const needNumSequenceCount = [];

  for (const num of nums) {
    numToFreq[num] = (numToFreq[num] ?? 0) + 1;
    needNumSequenceCount[num] = 0;
  }

  for (const num of nums) {
    if (numToFreq[num] > 0) {
      if (needNumSequenceCount[num] > 0) {
        numToFreq[num]--;
        needNumSequenceCount[num]--;
        needNumSequenceCount[num + 1] =
          (needNumSequenceCount[num + 1] ?? 0) + 1;
      } else {
        if ((numToFreq[num + 1] ?? 0) > 0 && (numToFreq[num + 2] ?? 0) > 0) {
          needNumSequenceCount[num + 3] =
            (needNumSequenceCount[num + 3] ?? 0) + 1;
          numToFreq[num]--;
          numToFreq[num + 1]--;
          numToFreq[num + 2]--;
        } else {
          return false;
        }
      }
    }
  }

  return true;
};
// @lc code=end
