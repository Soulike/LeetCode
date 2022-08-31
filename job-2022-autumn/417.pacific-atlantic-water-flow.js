/*
 * @lc app=leetcode id=417 lang=javascript
 *
 * [417] Pacific Atlantic Water Flow
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    const m = heights.length;
    const n = heights[0].length;

    const PACIFIC_MASK = 0b01;
    const ATLANTIC_MASK = 0b10;

    /**
     * 0b00 0b01 0b10 0b11
     * @type {number[][]} */
    const flood = new Array(m);
    for (let i = 0; i < flood.length; i++) {
        flood[i] = new Array(n);
        flood[i].fill(0b00);
    }

    /**
     * @param {number} i
     * @param {number} j
     * @returns {void}
     */
    const pacificFlood = (i, j) => {
        if (flood[i][j] & PACIFIC_MASK) return;

        flood[i][j] |= PACIFIC_MASK;
        if (i - 1 >= 0 && heights[i - 1][j] >= heights[i][j]) {
            pacificFlood(i - 1, j);
        }
        if (i + 1 <= m - 1 && heights[i + 1][j] >= heights[i][j]) {
            pacificFlood(i + 1, j);
        }
        if (j - 1 >= 0 && heights[i][j - 1] >= heights[i][j]) {
            pacificFlood(i, j - 1);
        }
        if (j + 1 <= n - 1 && heights[i][j + 1] >= heights[i][j]) {
            pacificFlood(i, j + 1);
        }
    };

    /**
     * @param {number} i
     * @param {number} j
     * @returns {void}
     */
    const atlanticFlood = (i, j) => {
        if (flood[i][j] & ATLANTIC_MASK) return;

        flood[i][j] |= ATLANTIC_MASK;
        if (i - 1 >= 0 && heights[i - 1][j] >= heights[i][j]) {
            atlanticFlood(i - 1, j);
        }
        if (i + 1 <= m - 1 && heights[i + 1][j] >= heights[i][j]) {
            atlanticFlood(i + 1, j);
        }
        if (j - 1 >= 0 && heights[i][j - 1] >= heights[i][j]) {
            atlanticFlood(i, j - 1);
        }
        if (j + 1 <= n - 1 && heights[i][j + 1] >= heights[i][j]) {
            atlanticFlood(i, j + 1);
        }
    };

    for (let i = 0; i < m; i++) {
        pacificFlood(i, 0);
        atlanticFlood(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        pacificFlood(0, j);
        atlanticFlood(m - 1, j);
    }

    /** @type {[number, number][]} */
    const result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (flood[i][j] === (PACIFIC_MASK | ATLANTIC_MASK)) {
                result.push([i, j]);
            }
        }
    }

    return result;
};
// @lc code=end
