/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const onPathNodes = new Set();
  const cache = new Map();
  /** @type {number[][]} */
  const graph = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }
  for (const [to, from] of prerequisites) {
    graph[from].push(to);
  }

  for (let i = 0; i < numCourses; i++) {
    onPathNodes.clear();
    if (!canTraverseWithoutLoop(i, graph, onPathNodes, cache)) {
      return false;
    }
  }

  return true;
};

/**
 * Whether the traverse can finish without encountering any loop
 * @param {number} node
 * @param {number[][]} graph
 * @param {Set<number>} onPathNodes
 * @param {Map<number, boolean>} cache
 * @returns {boolean}
 */
function canTraverseWithoutLoop(node, graph, onPathNodes, cache) {
  if (cache.has(node)) {
    return cache.get(node);
  }
  if (onPathNodes.has(node)) {
    cache.set(node, false);
    return false;
  }
  onPathNodes.add(node);
  const neighbors = graph[node];

  for (const neighbor of neighbors) {
    if (!canTraverseWithoutLoop(neighbor, graph, onPathNodes, cache)) {
      cache.set(node, false);
      return false;
    }
  }

  onPathNodes.delete(node);
  cache.set(node, true);
  return true;
}
// @lc code=end
