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
        this.preSum = [];

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
        // 这里从 1 开始扔是因为我们取右边界
        // 比如第一个数的比重是 100，第二个是 10，我们能取到 [1,100] 这 100 个数和 [101,110] 这 10 个数，这才是公平的
        const randomNum = this.generateRandom(1, this.preSum[this.preSum.length - 1]);

        let leftIndex = 0;
        let rightIndex = this.preSum.length - 1;

        while (true)
        {
            const midIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
            const midPreSum = this.preSum[midIndex];
            if (midPreSum >= randomNum)
            {
                if (midIndex === 0
                    || this.preSum[midIndex - 1] < randomNum)
                {
                    return midIndex;
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

const solution = new Solution([1,3,2,1]);

console.log(solution.pickIndex());