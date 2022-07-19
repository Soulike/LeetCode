/*
 * @lc app=leetcode id=710 lang=javascript
 *
 * [710] Random Pick with Blacklist
 */

// @lc code=start
class Solution {
    #map;
    #randomRight;
    /**
     * @param {number} n
     * @param {number[]} blacklist
     */
    constructor(n, blacklist) {
        this.#map = new Map();
        this.#randomRight = n - blacklist.length - 1;

        const blackListSet = new Set(blacklist);

        let currentRandomRight = n - 1;

        while (blackListSet.has(currentRandomRight)) {
            currentRandomRight--;
        }

        for (const blacklistNum of blacklist) {
            if (blacklistNum <= this.#randomRight) {
                this.#map.set(blacklistNum, currentRandomRight);
                currentRandomRight--;
                while (blackListSet.has(currentRandomRight)) {
                    currentRandomRight--;
                }
            }
        }
    }

    /**
     * @return {number}
     */
    pick() {
        const num = this.#getRandomNum(0, this.#randomRight + 1);
        return !this.#map.has(num) ? num : this.#map.get(num);
    }

    /**
     * [start, end)
     * @param {number} start
     * @param {number} end
     */
    #getRandomNum(start, end) {
        return start + Math.floor(Math.random() * (end - start));
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
// @lc code=end
