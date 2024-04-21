/*
 * @lc app=leetcode id=1202 lang=javascript
 *
 * [1202] Smallest String With Swaps
 */

// @lc code=start

class UFSet {
  /** @type {number[]} */
  parent;

  /** @param {number} size */
  constructor(size) {
    this.parent = new Array(size);
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  /**
   * @param {number} element1Index
   * @param {number} element2Index
   */
  union(element1Index, element2Index) {
    const element1RootIndex = this.find(element1Index);
    const element2RootIndex = this.find(element2Index);

    this.parent[element2RootIndex] = element1RootIndex;
  }

  /**
   * @param {number} elementIndex
   * @returns {number}
   */
  find(elementIndex) {
    let currentIndex = this.parent[elementIndex];
    while (this.parent[currentIndex] !== currentIndex) {
      this.parent[currentIndex] = this.parent[this.parent[currentIndex]];
      currentIndex = this.parent[currentIndex];
    }

    return currentIndex;
  }

  /**
   * @returns {number[][]}
   */
  getElementIndexGroups() {
    /** @type {Map<number, number[]>} */
    const rootIndexToIndexGroups = new Map();

    for (let i = 0; i < this.parent.length; i++) {
      const rootIndex = this.find(i);
      const indexGroup = rootIndexToIndexGroups.get(rootIndex);
      if (indexGroup !== undefined) {
        indexGroup.push(i);
      } else {
        rootIndexToIndexGroups.set(rootIndex, [i]);
      }
    }

    return [...rootIndexToIndexGroups.values()];
  }
}

/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  /**
   * 将下标看作点，pairs 当中的下标对看作图的边，
   * 那么任意可达的两点都可交换，
   * 也就是说，将每个连通子图中包含的字母进行排序后放回即可。
   * 连通子图问题，可以用并查集解决。
   */

  const sSplit = s.split('');
  const ufSet = new UFSet(s.length);
  for (const [a, b] of pairs) {
    ufSet.union(a, b);
  }

  const indexGroups = ufSet.getElementIndexGroups();

  for (const indexGroup of indexGroups) {
    /** @type {string[]} */
    const charGroup = new Array(indexGroup.length);
    for (let i = 0; i < indexGroup.length; i++) {
      charGroup[i] = sSplit[indexGroup[i]];
    }
    charGroup.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    for (let i = 0; i < indexGroup.length; i++) {
      sSplit[indexGroup[i]] = charGroup[i];
    }
  }

  return sSplit.join('');
};
// @lc code=end
