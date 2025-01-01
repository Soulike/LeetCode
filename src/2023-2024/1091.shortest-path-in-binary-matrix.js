/*
 * @lc app=leetcode id=1091 lang=javascript
 *
 * [1091] Shortest Path in Binary Matrix
 */

// @lc code=start
/**
 * @param {(0|1)[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const N = grid.length;
  if (grid[0][0] === 1 || grid[N - 1][N - 1] === 1) return -1;

  /** @type {[x: number, y: number, steps: number][]} */
  const queue = [[0, 0, 1]];
  grid[0][0] = 1;

  while (queue.length > 0) {
    const [x, y, steps] = queue[0];
    if (x === N - 1 && y === N - 1) return steps;
    queue.shift();

    const neighbors = getNeighbors(x, y, N - 1, N - 1);
    for (const [newX, newY] of neighbors) {
      if (grid[newX][newY] === 0) {
        grid[newX][newY] = 1;
        queue.push([newX, newY, steps + 1]);
      }
    }
  }

  return -1;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} maxX
 * @param {number} maxY
 * @returns {[x: number, y: number][]}
 */
function getNeighbors(x, y, maxX, maxY) {
  const offsets = [-1, 0, 1];
  /** @type {[x: number, y: number][]} */
  const neighbors = [];
  for (const xOffset of offsets) {
    const newX = x + xOffset;
    if (newX < 0 || newX > maxX) continue;
    for (const yOffset of offsets) {
      const newY = y + yOffset;
      if (newY < 0 || newY > maxY) continue;
      if (xOffset === 0 && yOffset === 0) continue;

      neighbors.push([x + xOffset, y + yOffset]);
    }
  }

  return neighbors;
}
// @lc code=end

shortestPathBinaryMatrix([
  [0, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0],
]);
