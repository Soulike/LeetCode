/*
 * @lc app=leetcode id=130 lang=javascript
 *
 * [130] Surrounded Regions
 */

// @lc code=start
/**
 * @param {('X'|'O'|'M')[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = function (board) {
    const BORDER_REACHABLE = 'M';

    const m = board.length;
    const n = board[0].length;
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') {
            board[i][0] = BORDER_REACHABLE;
        }
        if (board[i][n - 1] === 'O') {
            board[i][n - 1] = BORDER_REACHABLE;
        }
    }
    for (let i = 1; i < n - 1; i++) {
        if (board[0][i] === 'O') {
            board[0][i] = BORDER_REACHABLE;
        }
        if (board[m - 1][i] === 'O') {
            board[m - 1][i] = BORDER_REACHABLE;
        }
    }
    let changed = true;
    while (changed) {
        changed = false;
        for (let i = 1; i < m - 1; i++) {
            for (let j = 1; j < n - 1; j++) {
                if (board[i][j] !== BORDER_REACHABLE) {
                    if (
                        board[i][j] === 'O' &&
                        (board[i - 1][j] === BORDER_REACHABLE ||
                            board[i + 1][j] === BORDER_REACHABLE ||
                            board[i][j - 1] === BORDER_REACHABLE ||
                            board[i][j + 1] === BORDER_REACHABLE)
                    ) {
                        board[i][j] = BORDER_REACHABLE;
                    }

                    if (board[i][j] === BORDER_REACHABLE) {
                        changed = true;
                    }
                }
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === BORDER_REACHABLE) {
                board[i][j] = 'O';
            } else {
                board[i][j] = 'X';
            }
        }
    }
};
// @lc code=end
