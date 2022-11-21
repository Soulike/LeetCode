/*
 * @lc app=leetcode id=1926 lang=javascript
 *
 * [1926] Nearest Exit from Entrance in Maze
 */

// @lc code=start
/**
 * @param {('.'|'+')[][]} maze
 * @param {[row: number, col: number]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
    const WALL = '+';
    const EMPTY = '.';
    const m = maze.length;
    const n = maze[0].length;

    /** @type {[row: number, col: number, step: number][]} */
    const queue = [[...entrance, 0]];

    while (queue.length > 0) {
        const [row, col, step] = queue.shift();
        if (row === 0 || row === m - 1 || col === 0 || col === n - 1) {
            if (row !== entrance[0] || col !== entrance[1]) {
                return step;
            }
        }

        if (row - 1 >= 0 && maze[row - 1][col] === EMPTY) {
            queue.push([row - 1, col, step + 1]);
            maze[row - 1][col] = WALL;
        }
        if (row + 1 <= m - 1 && maze[row + 1][col] === EMPTY) {
            queue.push([row + 1, col, step + 1]);
            maze[row + 1][col] = WALL;
        }
        if (col - 1 >= 0 && maze[row][col - 1] === EMPTY) {
            queue.push([row, col - 1, step + 1]);
            maze[row][col - 1] = WALL;
        }
        if (col + 1 <= n - 1 && maze[row][col + 1] === EMPTY) {
            queue.push([row, col + 1, step + 1]);
            maze[row][col + 1] = WALL;
        }
    }

    return -1;
};
// @lc code=end
