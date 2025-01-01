/*
 * @lc app=leetcode id=705 lang=javascript
 *
 * [705] Design HashSet
 */

// @lc code=start

class MyHashSet {
  /** @type {number} */
  #INVALID;
  /** @type {number} */
  #MOD;
  /** @type {number[][]} */
  #pools;

  constructor() {
    this.#INVALID = -1;
    this.#MOD = 1031237;
    this.#pools = [];
  }

  /**
   * @param {number} key
   * @return {void}
   */
  add(key) {
    const pool = this.#getOrCreatePool(key);

    let inserted = false;
    for (let i = 0; i < pool.length; i++) {
      if (pool[i] === key) return;
      if (pool[i] === this.#INVALID) {
        pool[i] = key;
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      pool.push(key);
    }
  }

  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const pool = this.#getOrCreatePool(key);
    for (let i = 0; i < pool.length; i++) {
      if (pool[i] === key) {
        pool[i] = this.#INVALID;
        break;
      }
    }
  }

  /**
   * @param {number} key
   * @return {boolean}
   */
  contains(key) {
    const pool = this.#getPool(key);
    if (pool === undefined) return false;

    for (const num of pool) {
      if (num === key) return true;
    }

    return false;
  }

  /**
   * @param {number} key
   * @return {number[]}
   */
  #getOrCreatePool(key) {
    const poolIndex = this.#getHash(key);
    const pool = this.#getPool(key) ?? [];
    this.#pools[poolIndex] = pool;
    return pool;
  }

  /**
   * @param {number} key
   * @return {number[] | undefined}
   */
  #getPool(key) {
    const poolIndex = this.#getHash(key);
    const pool = this.#pools[poolIndex];
    return pool;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  #getHash(key) {
    return key % this.#MOD;
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
// @lc code=end
