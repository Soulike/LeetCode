/*
 * @lc app=leetcode id=1971 lang=javascript
 *
 * [1971] Find if Path Exists in Graph
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  /** @type {number[][]} */
  const vertexToNeighbors = new Array(n);
  for (let i = 0; i < n; i++) {
    vertexToNeighbors[i] = [];
  }
  for (const [vertex1, vertex2] of edges) {
    vertexToNeighbors[vertex1].push(vertex2);
    vertexToNeighbors[vertex2].push(vertex1);
  }

  const forwardVertexQueue = [source];
  const backwardVertexQueue = [destination];
  /** @type {Set<number>} */
  const forwardVisitedVertexes = new Set([source]);
  const backwardVisitedVertexes = new Set([destination]);

  while (forwardVertexQueue.length > 0 && backwardVertexQueue.length > 0) {
    const forwardVertex = forwardVertexQueue.shift();
    if (backwardVisitedVertexes.has(forwardVertex)) {
      return true;
    }

    const forwardNeighbors = vertexToNeighbors[forwardVertex];
    for (const neighbor of forwardNeighbors) {
      if (!forwardVisitedVertexes.has(neighbor)) {
        forwardVertexQueue.push(neighbor);
        forwardVisitedVertexes.add(neighbor);
      }
    }

    const backwardVertex = backwardVertexQueue.shift();
    if (forwardVisitedVertexes.has(backwardVertex)) {
      return true;
    }

    const backwardNeighbors = vertexToNeighbors[backwardVertex];
    for (const neighbor of backwardNeighbors) {
      if (!backwardVisitedVertexes.has(neighbor)) {
        backwardVertexQueue.push(neighbor);
        backwardVisitedVertexes.add(neighbor);
      }
    }
  }

  return false;
};
// @lc code=end
