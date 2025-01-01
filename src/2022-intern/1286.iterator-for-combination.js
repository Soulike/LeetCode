/*
 * @lc app=leetcode id=1286 lang=javascript
 *
 * [1286] Iterator for Combination
 */

// @lc code=start
/**
 * @param {string} characters
 * @param {number} combinationLength
 */
class CombinationIterator {
  generator;
  value;
  done;

  constructor(characters, combinationLength) {
    this.generator = nextCombination(characters.split(''), combinationLength);
    const {value, done} = this.generator.next();
    this.value = value;
    this.done = done;
  }

  /**
   * @return {string}
   */
  next() {
    const prevValue = this.value;
    const {value, done} = this.generator.next();
    this.value = value;
    this.done = done;

    return prevValue.join('');
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return !this.done;
  }
}

/**
 *
 * @param {string[]} s
 * @param {number} k
 */
function nextCombination(s, k) {
  const current = [];

  function* backtrack(startIndex) {
    if (current.length === k) {
      yield [...current];
    } else {
      for (let i = startIndex; i < s.length; i++) {
        current.push(s[i]);
        yield* backtrack(i + 1);
        current.pop();
      }
    }
  }

  return backtrack(0);
}

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end
