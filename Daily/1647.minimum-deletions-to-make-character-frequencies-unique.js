/*
 * @lc app=leetcode id=1647 lang=javascript
 *
 * [1647] Minimum Deletions to Make Character Frequencies Unique
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
  /** @type {Map<string, number>} */
  const letterToFreq = new Map();
  for (const c of s) {
    letterToFreq.set(c, (letterToFreq.get(c) ?? 0) + 1);
  }

  /** @type {Set<number>} */
  const usedFreqs = new Set();
  let deleteCount = 0;

  for (let [letter, freq] of letterToFreq) {
    while (freq > 0 && usedFreqs.has(freq)) {
      deleteCount++;
      freq--;
    }

    if (freq > 0) {
      usedFreqs.add(freq);
    }
  }

  return deleteCount;
};
// @lc code=end
