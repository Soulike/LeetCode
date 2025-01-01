/*
 * @lc app=leetcode id=427 lang=javascript
 *
 * [427] Construct Quad Tree
 */

// @lc code=start
/**
 *
 * @param {0|1} val
 * @param {boolean} isLeaf
 * @param {Node|null} topLeft
 * @param {Node|null} topRight
 * @param {Node|null} bottomLeft
 * @param {Node|null} bottomRight
 */
function Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val;
  this.isLeaf = isLeaf;
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
}

/**
 * @param {number[][]} grid
 * @return {Node}
 */
var construct = function (grid) {
  /**
   * @param {number} startX
   * @param {number} startY
   * @param {number} endX
   * @param {number} endY
   * @returns {Node}
   */
  const builder = (startX, startY, endX, endY) => {
    if (
      (startX === endX && startY === endY) ||
      hasSameValues(startX, startY, endX, endY)
    ) {
      return new Node(grid[startX][startY], true, null, null, null, null);
    }
    const xMid = Math.floor((startX + endX) / 2);
    const yMid = Math.floor((startY + endY) / 2);
    const root = new Node(
      1,
      false,
      builder(startX, startY, xMid, yMid), // top left
      builder(startX, yMid + 1, xMid, endY), // top right
      builder(xMid + 1, startY, endX, yMid), // bottom left
      builder(xMid + 1, yMid + 1, endX, endY), // bottom right
    );

    return root;
  };

  /**
   * @param {number} startX
   * @param {number} startY
   * @param {number} endX
   * @param {number} endY
   * @returns {boolean}
   */
  const hasSameValues = (startX, startY, endX, endY) => {
    /** @type {Map<string, boolean>} */
    const memo = new Map();

    /**
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @returns {boolean}
     */
    const helper = (startX, startY, endX, endY) => {
      if (startX === endX - 1 && startY === endY - 1) {
        const expectedValue = grid[startX][startY];
        for (let i = startX; i <= endX; i++) {
          for (let j = startY; j <= endY; j++) {
            if (grid[i][j] !== expectedValue) {
              return false;
            }
          }
        }
        return true;
      }

      const memoKey = `${startX}-${startY}-${endX}-${endY}`;

      if (memo.has(memoKey)) return memo.get(memoKey);

      const xMid = Math.floor((startX + endX) / 2);
      const yMid = Math.floor((startY + endY) / 2);

      const result =
        helper(startX, startY, xMid, yMid) && // top left
        helper(startX, yMid + 1, xMid, endY) && // top right
        helper(xMid + 1, startY, endX, yMid) && // bottom left
        helper(xMid + 1, yMid + 1, endX, endY) && // bottom right
        grid[startX][startY] === grid[startX][yMid + 1] &&
        grid[startX][startY] === grid[xMid + 1][startY] &&
        grid[startX][startY] === grid[xMid + 1][yMid + 1];

      memo.set(memoKey, result);
      return result;
    };

    return helper(startX, startY, endX, endY);
  };

  const result = builder(0, 0, grid.length - 1, grid[0].length - 1);
  return result;
};
// @lc code=end
