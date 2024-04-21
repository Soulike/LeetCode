/*
 * @lc app=leetcode id=381 lang=javascript
 *
 * [381] Insert Delete GetRandom O(1) - Duplicates allowed
 */

// @lc code=start

class RandomizedCollection {
  store;
  valueToIndexes;

  constructor() {
    this.store = [];
    this.valueToIndexes = new Map();
  }
  /**
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    this.store.push(val);
    const newIndex = this.store.length - 1;

    if (!this.valueToIndexes.has(val)) {
      const indexes = new Set();
      indexes.add(newIndex);
      this.valueToIndexes.set(val, indexes);
      return true;
    } else {
      const indexes = this.valueToIndexes.get(val);
      indexes.add(newIndex);
      return false;
    }
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (this.valueToIndexes.has(val)) {
      const indexes = this.valueToIndexes.get(val);
      const index = indexes.values().next().value;
      indexes.delete(index);

      if (indexes.size === 0) {
        this.valueToIndexes.delete(val);
      }

      const lastIndex = this.store.length - 1;

      if (lastIndex === index) {
        this.store.pop();
      } else {
        const lastValue = this.store[lastIndex];

        [this.store[index], this.store[lastIndex]] = [
          this.store[lastIndex],
          this.store[index],
        ];

        this.store.pop();

        const lastValueIndexes = this.valueToIndexes.get(lastValue);
        lastValueIndexes.delete(lastIndex);
        lastValueIndexes.add(index);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * @return {number}
   */
  getRandom() {
    const storeLength = this.store.length;

    const randomIndex = this.generateRandom(0, storeLength - 1);
    return this.store[randomIndex];
  }

  generateRandom(start, end) {
    return Math.floor(start + Math.random() * (end + 1));
  }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
