/*
 * @lc app=leetcode id=710 lang=javascript
 *
 * [710] Random Pick with Blacklist
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} blacklist
 */
class Solution
{
    remap;
    expectedSize;

    constructor(n, blacklist)
    {
        this.remap = new Map();

        this.expectedSize = n - blacklist.length;

        for (const num of blacklist)
        {
            this.remap.set(num, -1);
        }

        let blackZoneIndex = n - 1;
        for (const blackNum of blacklist)
        {
            // 如果 num 已经在区间 [expectedSize, N)
            // 可以直接忽略
            if (blackNum >= this.expectedSize)
            {
                continue;
            }
            while (this.remap.has(blackZoneIndex))
            {
                blackZoneIndex--;
            }
            this.remap.set(blackNum, blackZoneIndex);
            blackZoneIndex--;
        }
    }
    /**
     * @return {number}
     */
    pick()
    {
        const randomIndex = this.generateRandom(0, this.expectedSize - 1);
        if (!this.remap.has(randomIndex))
        {
            return randomIndex;
        }
        else
        {
            return this.remap.get(randomIndex);
        }
    }

    generateRandom(start, end)
    {
        return Math.floor(start + Math.random() * (end + 1));
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
// @lc code=end

