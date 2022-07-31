/*
 * @lc app=leetcode id=130 lang=javascript
 *
 * [130] Surrounded Regions
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    const m = board.length;
    const n = board[0].length;

    /**
     * Fill an area of 'O's into 'N's
     * @param {number} i
     * @param {number} j
     */
    const fillN = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
            return;
        }

        board[i][j] = 'N';
        fillN(i - 1, j);
        fillN(i + 1, j);
        fillN(i, j - 1);
        fillN(i, j + 1);
    };

    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') {
            fillN(i, 0);
        }
        if (board[i][n - 1] === 'O') {
            fillN(i, n - 1);
        }
    }

    for (let j = 1; j < n - 1; j++) {
        if (board[0][j] === 'O') {
            fillN(0, j);
        }
        if (board[m - 1][j] === 'O') {
            fillN(m - 1, j);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'N') {
                board[i][j] = 'O';
            }
        }
    }
};
// @lc code=end
