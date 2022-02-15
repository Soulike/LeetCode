/*
 * @lc app=leetcode id=528 lang=javascript
 *
 * [528] Random Pick with Weight
 */

// @lc code=start
/**
 * @param {number[]} w
 */
class Solution
{
    preSum;

    constructor(w)
    {
        this.preSum = [0];

        // 累加和
        w.reduce((prev, curr) =>
        {
            this.preSum.push(prev + curr);
            return prev + curr;
        }, 0);
    }
    /**
     * @return {number}
     */
    pickIndex()
    {
        // 扔石头，看扔到哪个区间里面，用二分搜索找到这个区间的右边界
        const randomNum = this.generateRandom(1, this.preSum[this.preSum.length - 1]);

        let leftIndex = 0;
        let rightIndex = this.preSum.length - 1;

        while (true)
        {
            const midIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
            const midPreSum = this.preSum[midIndex];
            if (midPreSum >= randomNum)
            {
                if (this.preSum[midIndex - 1] < randomNum)
                {
                    return midIndex - 1;
                }
                else
                {
                    rightIndex = midIndex - 1;
                }
            }
            else
            {
                leftIndex = midIndex + 1;
            }
        }
    }

    generateRandom(start, end)
    {
        return Math.floor(start + Math.random() * ((end - start + 1)));
    }
}


/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
// @lc code=end