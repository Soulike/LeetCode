/*
 * @lc app=leetcode id=52 lang=javascript
 *
 * [52] N-Queens II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
    const board = new Array(n);
    for (let i = 0; i < n; i++) {
        board[i] = new Array(n);
        board[i].fill('.');
    }
    let resultCount = 0;

    function isValidPosition(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false;
            }
        }

        for (let d = 1; row - d >= 0 && col - d >= 0; d++) {
            if (board[row - d][col - d] === 'Q') {
                return false;
            }
        }

        for (let d = 1; row - d >= 0 && col + d < n; d++) {
            if (board[row - d][col + d] === 'Q') {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {number} queueCount 这次递归要放第几个皇后，从 0 开始
     */
    function helper(queueCount, startRow) {
        if (queueCount === n) {
            resultCount++;
        } else {
            for (let i = startRow; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (isValidPosition(i, j)) {
                        board[i][j] = 'Q';
                        helper(queueCount + 1, i + 1);
                        board[i][j] = '.';
                    }
                }
            }
        }
    }

    helper(0, 0);

    return resultCount;
};
// @lc code=end
