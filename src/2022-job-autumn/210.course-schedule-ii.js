/*
 * @lc app=leetcode id=210 lang=javascript
 *
 * [210] Course Schedule II
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  /**@type {number[][]} */
  const graph = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }

  for (const [to, from] of prerequisites) {
    graph[from].push(to);
  }

  const onPathNodes = new Set();
  const visited = new Set();
  /** @type {number[]} */
  const result = [];

  for (let i = 0; i < numCourses; i++) {
    onPathNodes.clear();
    if (!postorderTraverse(i, graph, onPathNodes, visited, result)) {
      return [];
    }
  }

  return result.reverse();
};

/**
 * Starts from `node`, traverse the nodes that are not traversed before in post order
 * @param {number} node
 * @param {number[][]} graph
 * @param {Set<number>} onPathNodes
 * @param {Set<number>} visited
 * @param {number[]} result
 * @returns {boolean} - Whether the traverse encounters a loop
 */
function postorderTraverse(node, graph, onPathNodes, visited, result) {
  if (onPathNodes.has(node)) {
    return false;
  }
  onPathNodes.add(node);

  if (visited.has(node)) {
    onPathNodes.delete(node);
    return true;
  }
  visited.add(node);

  const neighbors = graph[node];
  for (const neighbor of neighbors) {
    if (!postorderTraverse(neighbor, graph, onPathNodes, visited, result)) {
      onPathNodes.delete(node);
      return false;
    }
  }

  result.push(node);

  onPathNodes.delete(node);
  return true;
}
// @lc code=end

console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
    [0, 3],
  ]),
);
