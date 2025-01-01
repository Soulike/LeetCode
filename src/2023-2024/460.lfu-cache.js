/*
 * @lc app=leetcode id=460 lang=javascript
 *
 * [460] LFU Cache
 */

// @lc code=start
class LFUCache {
  /** @type {Map<number, number>} */
  #keyToFreq;
  /** @type {Map<number, Set<number>>} */
  #freqToKeys;
  /** @type {Map<number, number>} */
  #store;
  /** @type {number} */
  #leastFreq;
  /** @type {number} */
  #capacity;

  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.#keyToFreq = new Map();
    this.#freqToKeys = new Map();
    this.#store = new Map();
    this.#leastFreq = 0;
    this.#capacity = capacity;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.#store.has(key)) {
      return -1;
    } else {
      const value = this.#store.get(key);
      if (value === undefined) {
        throw new Error('value should not be undefined');
      }
      this.#increaseFreq(key);
      return value;
    }
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.#store.has(key) || this.#store.size < this.#capacity) {
      // replace or add
      this.#store.set(key, value);
      this.#increaseFreq(key);
    } else if (this.#capacity > 0) {
      this.#deleteLeastFreqKey();
      this.#store.set(key, value);
      this.#increaseFreq(key);
    }
  }

  /**
   * Increase the frequency of `key` and update `leastFreq`. Set the frequency to 1 if key does not exist before
   * @param {number} key
   * @returns {void}
   */
  #increaseFreq(key) {
    const prevFreq = this.#keyToFreq.get(key) ?? 0;
    const nextFreq = prevFreq + 1;

    this.#keyToFreq.set(key, nextFreq);

    const prevFreqKeys = this.#freqToKeys.get(prevFreq) ?? new Set();
    const nextFreqKeys = this.#freqToKeys.get(nextFreq) ?? new Set();

    prevFreqKeys.delete(key);
    this.#freqToKeys.set(prevFreq, prevFreqKeys);

    nextFreqKeys.add(key);
    this.#freqToKeys.set(nextFreq, nextFreqKeys);

    if (
      prevFreq === 0 ||
      (this.#leastFreq === prevFreq && prevFreqKeys.size === 0)
    ) {
      this.#leastFreq = nextFreq;
    }
  }

  /**
   * @param {number} key
   * @returns {void}
   */
  #deleteKey(key) {
    this.#store.delete(key);

    const freq = this.#keyToFreq.get(key);

    if (freq === undefined) {
      throw new Error('freq should not be undefined');
    }

    this.#keyToFreq.delete(key);

    const freqKeys = this.#freqToKeys.get(freq);

    if (freqKeys === undefined) {
      throw new Error('freqKeys should not be undefined');
    }

    freqKeys.delete(key);

    /*
        no need to update #leastKeys here because
        1. if freq !== leastKeys, ok
        2. if freq === leastKeys, and freqKeys.size !== 0, ok
        3. if freq === leastKeys, and freqKeys.size === 0, the delete must happen before a new key is put, and leastKeys is then updated
        */
  }

  #deleteLeastFreqKey() {
    const leastFreqKeys = this.#freqToKeys.get(this.#leastFreq);
    if (leastFreqKeys === undefined) {
      throw new Error('leastFreqKeys should not be undefined');
    }

    const leastFreqKeysIterator = leastFreqKeys.keys();
    const leastRecentlyUsedKey = leastFreqKeysIterator.next().value;
    if (typeof leastRecentlyUsedKey !== 'number') {
      throw new Error('leastRecentlyUsedKey should not be undefined');
    }
    this.#deleteKey(leastRecentlyUsedKey);
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
