/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  /** @type {Map<string, string[]>} */
  const strToAnagrams = new Map();

  for (const str of strs) {
    const mapKey = str.split('').sort().join('');
    const anagrams = strToAnagrams.get(mapKey) ?? [];
    anagrams.push(str);
    strToAnagrams.set(mapKey, anagrams);
  }

  return Array.from(strToAnagrams.values());
};
// @lc code=end
