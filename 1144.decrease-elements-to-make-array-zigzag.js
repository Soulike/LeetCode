/*
 * @lc app=leetcode id=1144 lang=javascript
 *
 * [1144] Decrease Elements To Make Array Zigzag
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const movesToMakeZigzag = function (nums)
{
    const LENGTH = nums.length;
    if (LENGTH < 2)
    {
        return 0;
    }
    else if (LENGTH === 2)
    {
        return nums[0] === nums[1] ? 1 : 0;
    }
    else    // LENGTH >= 3
    {
        /*
        要么是所有奇数位置小于相邻的两个偶数位置
        要么是所有偶数位置小于相邻的两个奇数位置
        */
        let oddMoveCount = 0;
        let evenMoveCount = 0;
        for (let i = 1; i < LENGTH; i += 2)
        {
            let moveCount = 0;
            if (i === LENGTH - 1)
            {
                moveCount = nums[i] - (nums[i - 1] - 1);
            }
            else
            {
                moveCount = nums[i] - (Math.min(nums[i - 1], nums[i + 1]) - 1);
            }
            if (moveCount > 0)  // 如果小于 0，证明不用减小
            {
                oddMoveCount += moveCount;
            }
        }
        for (let i = 0; i < LENGTH; i += 2)
        {
            let moveCount = 0;
            if (i === 0)
            {
                moveCount = nums[i] - (nums[i + 1] - 1);
            }
            else if (i === LENGTH - 1)
            {
                moveCount = nums[i] - (nums[i - 1] - 1);
            }
            else
            {
                moveCount = nums[i] - (Math.min(nums[i - 1], nums[i + 1]) - 1);
            }
            if (moveCount > 0)
            {
                evenMoveCount += moveCount;
            }
        }
        return Math.min(evenMoveCount, oddMoveCount);
    }
};
// @lc code=end