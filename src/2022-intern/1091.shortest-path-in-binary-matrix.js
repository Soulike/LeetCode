/*
 * @lc app=leetcode id=1091 lang=javascript
 *
 * [1091] Shortest Path in Binary Matrix
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const N = grid.length;

  if (grid[0][0] !== 0 || grid[N - 1][N - 1] !== 0) {
    return -1;
  }

  /**
   * @type {[number, number, number][]} - [x, y, step]
   * */
  const forwardQueue = [[0, 0, 0]];
  /** @type {Map<string, number>} */
  const forwardVisited = new Map([['0-0', 0]]);
  /** @type {[number, number, number][]} */
  const backwardQueue = [[N - 1, N - 1, 0]];
  /** @type {Map<string, number>} */
  const backwardVisited = new Map([[`${N - 1}-${N - 1}`, 0]]);

  while (forwardQueue.length !== 0 && backwardQueue.length !== 0) {
    const [forwardX, forwardY, forwardStep] = pushNextSteps(
      forwardQueue,
      forwardVisited,
      grid,
    );

    if (backwardVisited.has(`${forwardX}-${forwardY}`)) {
      return backwardVisited.get(`${forwardX}-${forwardY}`) + forwardStep + 1;
    }

    const [backwardX, backwardY, backwardStep] = pushNextSteps(
      backwardQueue,
      backwardVisited,
      grid,
    );

    if (forwardVisited.has(`${backwardX}-${backwardY}`)) {
      return forwardVisited.get(`${backwardX}-${backwardY}`) + backwardStep + 1;
    }
  }

  return -1;
};

/**
 *
 * @param {[number, number, number][]} queue
 * @param {Map<string, number>} visited
 * @param {number[][]} grid
 * @returns {[number, number, number]}
 */
function pushNextSteps(queue, visited, grid) {
  const N = grid.length;
  const head = queue.shift();
  const [x, y, step] = head;

  const nextSteps = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x, y - 1],
  ];

  for (const [nextX, nextY] of nextSteps) {
    if (
      nextX >= 0 &&
      nextX <= N - 1 &&
      nextY >= 0 &&
      nextY <= N - 1 &&
      grid[nextX][nextY] === 0 &&
      !visited.has(`${nextX}-${nextY}`)
    ) {
      queue.push([nextX, nextY, step + 1]);
      visited.set(`${nextX}-${nextY}`, step + 1);
    }
  }

  return head;
}
// @lc code=end
