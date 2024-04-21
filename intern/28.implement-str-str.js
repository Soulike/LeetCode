/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 */

// @lc code=start
class KMP {
  /** @type {string} */
  #pattern;
  /**
   * `dp[state][charCode] = nextState`
   * @type {number[][]} */
  #dp;

  /**
   * @param {string} pattern
   */
  constructor(pattern) {
    this.#pattern = pattern;
    if (pattern.length !== 0) {
      this.#dp = new Array(pattern.length + 1);
      for (let i = 0; i < pattern.length + 1; i++) {
        this.#dp[i] = new Array(256);
        this.#dp[i].fill(0);
      }

      this.#dp[0][pattern.charCodeAt(0)] = 1;
      let shadowState = 0;

      for (let i = 1; i < pattern.length; i++) {
        for (let j = 0; j < 256; j++) {
          this.#dp[i][j] = this.#dp[shadowState][j];
        }

        this.#dp[i][pattern.charCodeAt(i)] = i + 1;
        shadowState = this.#dp[shadowState][pattern.charCodeAt(i)];
      }
    }
  }

  /**
   * @param {string} text
   */
  search(text) {
    if (this.#pattern.length === 0) {
      return 0;
    }
    if (text.length === 0) {
      // this.#pattern.length > 0
      return -1;
    }
    let currentState = 0;
    const finalState = this.#pattern.length;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      currentState = this.#dp[currentState][charCode];
      if (currentState === finalState) {
        return i - this.#pattern.length + 1;
      }
    }
    return -1;
  }
}

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const kmp = new KMP(needle);
  return kmp.search(haystack);
};
// @lc code=end
