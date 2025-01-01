/*
 * @lc app=leetcode id=990 lang=javascript
 *
 * [990] Satisfiability of Equality Equations
 */

// @lc code=start
class UnionFindSet {
  /** @type {number[]} */
  #parent;

  /**
   * @param {number} size
   */
  constructor(size) {
    this.#parent = new Array(size);
    for (let i = 0; i < size; i++) {
      this.#parent[i] = i;
    }
  }

  /**
   * @param {number} element1
   * @param {number} element2
   * @returns {void}
   */
  union(element1, element2) {
    const root1 = this.#find(element1);
    const root2 = this.#find(element2);
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
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  const unionFindSet = new UnionFindSet(26);
  /**
   * @param {string} letter
   * @returns {number}
   * */
  const letterToElement = (letter) => {
    return letter.charCodeAt(0) - 'a'.charCodeAt(0);
  };

  /** @type {[number, number][]} */
  const disconnectedElements = [];

  for (const [var1, sign, , var2] of equations) {
    if (sign === '=') {
      if (var1 !== var2) {
        unionFindSet.union(letterToElement(var1), letterToElement(var2));
      }
    } else if (sign === '!') {
      if (
        var1 === var2 ||
        unionFindSet.isConnected(letterToElement(var1), letterToElement(var2))
      ) {
        return false;
      }
      disconnectedElements.push([letterToElement(var1), letterToElement(var2)]);
    }
  }

  for (const [var1, var2] of disconnectedElements) {
    if (unionFindSet.isConnected(var1, var2)) {
      return false;
    }
  }

  return true;
};
// @lc code=end
