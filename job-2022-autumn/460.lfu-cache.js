/*
 * @lc app=leetcode id=460 lang=javascript
 *
 * [460] LFU Cache
 */

// @lc code=start
class LFUCache {
  /** @type {number} */
  #capacity;

  /** @type {Map<number, number>} */
  #keyToValue;

  /** @type {Map<number, number>} */
  #keyToFreq;

  /** @type {Map<number, Set<number>>} */
  #freqToKeys;

  /** @type {number} */
  #minFreq;

  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.#capacity = capacity;
    this.#keyToValue = new Map();
    this.#keyToFreq = new Map();
    this.#freqToKeys = new Map();
    this.#minFreq = 0;
  }
  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const value = this.#keyToValue.get(key);
    if (value === undefined) {
      return -1;
    } else {
      this.#increaseFreq(key);
      return value;
    }
  }

  /**
   * @param {number} key
   * @returns {void}
   */
  #increaseFreq(key) {
    const freq = this.#keyToFreq.get(key);
    if (freq === undefined) {
      throw new Error('Increase the frequency of nonexistent key');
    }

    const keysWithFreq = this.#freqToKeys.get(freq);
    if (keysWithFreq === undefined) {
      throw new Error('freq has not keys in keysWithFreq');
    }
    keysWithFreq.delete(key);
    if (keysWithFreq.size === 0) {
      this.#freqToKeys.delete(freq);
      if (this.#minFreq === freq) {
        this.#minFreq++;
      }
    }

    const newFreq = freq + 1;
    this.#keyToFreq.set(key, newFreq);
    const keysWithNewFreq = this.#freqToKeys.get(newFreq) ?? new Set();
    keysWithNewFreq.add(key);
    this.#freqToKeys.set(newFreq, keysWithNewFreq);
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.#capacity <= 0) {
      return;
    }
    if (!this.#keyToValue.has(key)) {
      if (this.#capacity === this.#keyToValue.size) {
        this.#removeLeastFrequentlyUsed();
      }
      this.#keyToValue.set(key, value);
      this.#keyToFreq.set(key, 1);
      const keysWith1Freq = this.#freqToKeys.get(1) ?? new Set();
      keysWith1Freq.add(key);
      this.#freqToKeys.set(1, keysWith1Freq);

      this.#minFreq = 1;
    } else {
      this.#keyToValue.set(key, value);
      this.#increaseFreq(key);
    }
  }

  #removeLeastFrequentlyUsed() {
    const keysWithLeastFreq = this.#freqToKeys.get(this.#minFreq);

    if (keysWithLeastFreq === undefined) {
      throw new Error('minFreq has no keys in freqToKeys');
    }

    const leastRecentlyUsedKey = keysWithLeastFreq.keys().next().value;

    keysWithLeastFreq.delete(leastRecentlyUsedKey);

    this.#keyToValue.delete(leastRecentlyUsedKey);
    this.#keyToFreq.delete(leastRecentlyUsedKey);

    if (keysWithLeastFreq.size === 0) {
      this.#freqToKeys.delete(this.#minFreq);
    }
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
