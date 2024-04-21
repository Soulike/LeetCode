/*
 * @lc app=leetcode id=1697 lang=javascript
 *
 * [1697] Checking Existence of Edge Length Limited Paths
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
 * @param {number} n
 * @param {[u: number, v: number, dis: number][]} edgeList
 * @param {[p: number, q: number, limit: number][]} queries
 * @return {boolean[]}
 */
var distanceLimitedPathsExist = function (n, edgeList, queries) {
  edgeList.sort(([, , dis1], [, , dis2]) => dis1 - dis2);

  /** @type {[p: number, q: number, limit: number, index: number][]} */
  const queryWithIndexes = queries.map((query, i) => [...query, i]);

  queryWithIndexes.sort(([, , limit1], [, , limit2]) => limit1 - limit2);

  /** @type {boolean[]} */
  const answer = [];

  const ufSet = new UnionFindSet(n);

  let edgeIndex = 0;
  for (const [p, q, limit, index] of queryWithIndexes) {
    while (edgeIndex < edgeList.length && edgeList[edgeIndex][2] < limit) {
      const [u, v] = edgeList[edgeIndex];
      ufSet.union(u, v);
      edgeIndex++;
    }

    answer[index] = ufSet.isConnected(p, q);
  }

  return answer;
};
// @lc code=end
