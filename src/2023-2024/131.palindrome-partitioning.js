/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  /**
   * @param {number} begin
   * @param {number} end
   * @returns {boolean}
   */
  const isPalindrome = (begin, end) => {
    let left = begin;
    let right = end;
    while (left <= right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };

  /** @type {string[][][]} */
  const getPartitionMemo = [];

  /**
   * @param {number} startIndex
   * @returns {string[][]}
   */
  const getPartition = (startIndex) => {
    if (startIndex == s.length) {
      return [[]];
    }

    if (getPartitionMemo[startIndex]) {
      return getPartitionMemo[startIndex];
    }

    /** @type {string[][]} */
    const result = [];

    for (
      let nextStartIndex = startIndex + 1;
      nextStartIndex <= s.length;
      nextStartIndex++
    ) {
      if (isPalindrome(startIndex, nextStartIndex - 1)) {
        const currentPartition = s.slice(startIndex, nextStartIndex);
        const otherPartitions = getPartition(nextStartIndex);
        for (let otherPartition of otherPartitions) {
          result.push([currentPartition, ...otherPartition]);
        }
      }
    }

    getPartitionMemo[startIndex] = result;
    return result;
  };

  const result = getPartition(0);
  return result;
};
// @lc code=end

partition('efe');
