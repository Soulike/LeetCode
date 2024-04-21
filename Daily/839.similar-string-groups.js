/*
 * @lc app=leetcode id=839 lang=javascript
 *
 * [839] Similar String Groups
 */

// @lc code=start
class UnionFindSet {
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
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
  const N = strs.length;
  const ufSet = new UnionFindSet(N);
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (areSimilar(strs[i], strs[j])) {
        ufSet.union(i, j);
      }
    }
  }

  return ufSet.getCount();
};

/**
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
function areSimilar(str1, str2) {
  const N = str1.length;
  /** @type {number[]} */
  const diffIndexes = [];
  for (let i = 0; i < N; i++) {
    if (str1[i] !== str2[i]) {
      diffIndexes.push(i);
      if (diffIndexes.length > 2) return false;
    }
  }

  return (
    str1[diffIndexes[0]] === str2[diffIndexes[1]] &&
    str1[diffIndexes[1]] === str2[diffIndexes[0]]
  );
}
// @lc code=end

numSimilarGroups(['omv', 'ovm']);
