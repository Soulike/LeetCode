/*
 * @lc app=leetcode id=2709 lang=javascript
 *
 * [2709] Greatest Common Divisor Traversal
 */

// @lc code=start
class UnionFindSet2709 {
  /** @type {number[]} */
  #parent;
  /** @type {number} */
  #count;

  /**
   * @param {number} size
   */
  constructor(size) {
    this.#parent = new Array(size);
    for (let i = 0; i < size; i++) {
      this.#parent[i] = i;
    }
    this.#count = size;
  }

  getCount() {
    return this.#count;
  }

  /**
   * @param {number} element1
   * @param {number} element2
   * @returns {void}
   */
  union(element1, element2) {
    const root1 = this.#find(element1);
    const root2 = this.#find(element2);
    if (root1 !== root2) {
      this.#count--;
    }
    this.#parent[root2] = root1;
  }

  /**
   * @param {number} element
   * @returns {number}
   */
  #find(element) {
    let currentElement = element;
    while (this.#parent[currentElement] !== currentElement) {
      currentElement = this.#parent[currentElement];
      this.#parent[currentElement] = this.#find(this.#parent[currentElement]);
    }
    return currentElement;
  }

  /**
   * @param {number} element1
   * @param {number} element2
   * @returns {boolean}
   */
  isConnected(element1, element2) {
    return this.#find(element1) === this.#find(element2);
  }
}

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canTraverseAllPairs = function (nums) {
  const ufSet = new UnionFindSet2709(nums.length);

  /** @type {number[]} */
  const primeFactorToIndex = [];

  for (let i = 0; i < nums.length; i++) {
    const primeFactors = PrimeFactorCalculator.getPrimeFactors(nums[i]);
    for (const factor of primeFactors) {
      if (primeFactorToIndex[factor] !== undefined) {
        ufSet.union(primeFactorToIndex[factor], i);
      } else {
        primeFactorToIndex[factor] = i; // Only need to remember the root element
      }
    }
  }

  // All nodes are connected
  return ufSet.getCount() === 1;
};

class PrimeFactorCalculator {
  /** @type {Map<number, Set<number>>} */
  static #primeFactorsMemo = new Map();

  /**
   * @param {number} num
   * @returns {Set<number>}
   */
  static getPrimeFactors(num) {
    if (PrimeFactorCalculator.#primeFactorsMemo.has(num)) {
      return PrimeFactorCalculator.#primeFactorsMemo.get(num);
    }

    /** @type {Set<number>} */
    const primeFactors = new Set();
    const sqrtNum = Math.sqrt(num);
    for (let i = 2; i <= sqrtNum; i++) {
      if (num % i === 0) {
        const set1 = PrimeFactorCalculator.getPrimeFactors(i);
        const set2 = PrimeFactorCalculator.getPrimeFactors(num / i);
        for (const factor of set1) primeFactors.add(factor);
        for (const factor of set2) primeFactors.add(factor);
      }
    }
    if (primeFactors.size === 0 && num !== 1) {
      primeFactors.add(num);
    }
    PrimeFactorCalculator.#primeFactorsMemo.set(num, primeFactors);
    return primeFactors;
  }
}
// @lc code=end
