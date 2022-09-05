/*
 * @lc app=leetcode id=51 lang=javascript
 *
 * [51] N-Queens
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const QUEEN = 'Q';
    const EMPTY = '.';

    /** @type {('Q'|'.')[][]} */
    const board = new Array(n);
    for (let i = 0; i < n; i++) {
        board[i] = new Array(n);
        board[i].fill(EMPTY);
    }

    /** @type {string[][]} */
    const solutions = [];

    /**
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    const canAttack = (x, y) => {
        // to up
        for (let i = x - 1; i >= 0; i--) {
            if (board[i][y] === QUEEN) {
                return true;
            }
        }

        // to top left
        let i = x - 1;
        let j = y - 1;
        while (i >= 0 && j >= 0) {
            if (board[i][j] === 'Q') {
                return true;
            }
            i--;
            j--;
        }

        // to top right
        i = x - 1;
        j = y + 1;

        while (i >= 0 && j <= n - 1) {
            if (board[i][j] === 'Q') {
                return true;
            }
            i--;
            j++;
        }

        return false;
    };

    /**
     * @param {number} x
     * @param {number} queensLeft
     */
    const backtrack = (x, queensLeft) => {
        if (x === n) {
            if (queensLeft === 0) {
                solutions.push(board.map((row) => row.join('')));
            }
            return;
        }

        if (queensLeft === 0) return;

        for (let y = 0; y < n; y++) {
            if (!canAttack(x, y)) {
                board[x][y] = QUEEN;
                backtrack(x + 1, queensLeft - 1);
                board[x][y] = EMPTY;
            }
        }
    };

    backtrack(0, n);

    return solutions;
};
// @lc code=end
