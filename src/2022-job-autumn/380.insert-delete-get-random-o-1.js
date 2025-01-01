/*
 * @lc app=leetcode id=380 lang=javascript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start

class RandomizedSet {
  #valToIndex;
  #arr;

  constructor() {
    this.#valToIndex = new Map();
    this.#arr = [];
  }
  /**
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    if (this.#valToIndex.has(val)) {
      return false;
    } else {
      this.#valToIndex.set(val, this.#arr.length);
      this.#arr.push(val);
      return true;
    }
  }
  /**
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (!this.#valToIndex.has(val)) {
      return false;
    } else {
      const index = this.#valToIndex.get(val);
      const lastVal = this.#arr[this.#arr.length - 1];
      [this.#arr[index], this.#arr[this.#arr.length - 1]] = [
        this.#arr[this.#arr.length - 1],
        this.#arr[index],
      ];
      this.#valToIndex.set(lastVal, index);
      this.#valToIndex.delete(val);
      this.#arr.pop();
      return true;
    }
  }
  /**
   * @return {number}
   */
  getRandom() {
    const index = RandomizedSet.#getRandomNum(0, this.#arr.length);
    return this.#arr[index];
  }

  /**
   * [start, end)
   * @param {number} start
   * @param {number} end
   * @returns {number}
   */
  static #getRandomNum(start, end) {
    return start + Math.floor(Math.random() * (end - start));
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
