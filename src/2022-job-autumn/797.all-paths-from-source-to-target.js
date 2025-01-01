/*
 * @lc app=leetcode id=797 lang=javascript
 *
 * [797] All Paths From Source to Target
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  return allPathsFrom(0, graph.length - 1, graph);
};

/**
 * @param {number} from
 * @param {number} to
 * @param {number[][]} graph
 * @returns {number[][]}
 */
function allPathsFrom(from, to, graph) {
  if (from === to) {
    return [[to]];
  }
  const nextNodes = graph[from];
  /** @type {number[][]} */
  const paths = [];
  for (const nextNode of nextNodes) {
    paths.push(...allPathsFrom(nextNode, to, graph));
  }

  for (const path of paths) {
    path.unshift(from);
  }

  return paths;
}
// @lc code=end
