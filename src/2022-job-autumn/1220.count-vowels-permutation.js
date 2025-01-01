/*
 * @lc app=leetcode id=1220 lang=javascript
 *
 * [1220] Count Vowels Permutation
 */

// @lc code=start
const MOD = 10 ** 9 + 7;
/** @type {('a'|'e'|'i'|'o'|'u')[]} */
const vows = ['a', 'e', 'i', 'o', 'u'];
const follows = {
  a: ['e'],
  e: ['a', 'i'],
  i: ['a', 'e', 'o', 'u'],
  o: ['i', 'u'],
  u: ['a'],
};
const cache = new Map();

/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function (n) {
  let result = 0;

  for (const vow of vows) {
    result += helper(vow, n, cache);
    result %= MOD;
  }

  return result;
};

/**
 * @param {'a'|'e'|'i'|'o'|'u'} currentVowel
 * @param {number} leftLength
 * @param {Map<string, number>} cache
 * @returns {number}
 */
function helper(currentVowel, leftLength, cache) {
  if (leftLength === 1) {
    return 1;
  }

  const cacheKey = `${currentVowel}-${leftLength}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  let result = 0;

  const follow = follows[currentVowel];
  for (const vow of follow) {
    result += helper(vow, leftLength - 1, cache);
    result %= MOD;
  }

  cache.set(cacheKey, result);
  return result;
}
// @lc code=end
