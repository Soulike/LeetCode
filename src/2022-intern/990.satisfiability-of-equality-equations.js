/*
 * @lc app=leetcode id=990 lang=javascript
 *
 * [990] Satisfiability of Equality Equations
 */

// @lc code=start

class UFNode {
  /** @type {string} */
  variable;
  /** @type {UFNode} */
  parent;
  /** @type {number} */
  size;

  /** @param {string} variable*/
  constructor(variable) {
    this.variable = variable;
    this.parent = this;
    this.size = 1;
  }
}

class UF {
  /**
   * @param {UFNode} node1
   * @param {UFNode} node2
   * @returns {void}
   */
  static union(node1, node2) {
    const root1 = UF.find(node1);
    const root2 = UF.find(node2);

    if (root1.size > root2.size) {
      root2.parent = root1;
      root1.size += root2.size;
    } else {
      root1.parent = root2;
      root2.size += root1.size;
    }
  }

  /**
   * 查看 node 所在集合
   * @param {UFNode} node
   * @returns {UFNode}
   */
  static find(node) {
    while (node.parent !== node) {
      node.parent = node.parent.parent;
      node = node.parent;
    }
    return node;
  }
}

/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  /** @type {Map<string, UFNode>} */
  const varToNode = new Map();
  /** @type {[UFNode, UFNode][]} */
  const unequalNodes = [];
  for (const equation of equations) {
    const [var1, sign, , var2] = equation;
    let node1 = varToNode.get(var1);
    if (node1 === undefined) {
      node1 = new UFNode(var1);
      varToNode.set(var1, node1);
    }

    let node2 = varToNode.get(var2);
    if (node2 === undefined) {
      node2 = new UFNode(var2);
      varToNode.set(var2, node2);
    }

    if (sign === '=') {
      UF.union(node1, node2);
    } // sign === '!'
    else {
      if (UF.find(node1) === UF.find(node2)) {
        return false;
      }

      unequalNodes.push([node1, node2]);
    }
  }

  for (const [node1, node2] of unequalNodes) {
    if (UF.find(node1) === UF.find(node2)) {
      return false;
    }
  }
  return true;
};
// @lc code=end
