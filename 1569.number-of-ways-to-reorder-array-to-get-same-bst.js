/*
 * @lc app=leetcode id=1569 lang=javascript
 *
 * [1569] Number of Ways to Reorder Array to Get Same BST
 */

// @lc code=start
const MOD = BigInt(10 ** 9 + 7);
/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function (nums)
{
    // 减去原本就有的那种 BST
    return Number((dfs(nums) - 1n) % MOD);
};

/**
 * 对于 nums，有多少种排列能构造出相同的 BST？
 * @param {number[]} nums 
 * @returns {bigint}
 */
function dfs(nums)
{
    if (nums.length < 3)
    {
        return 1n;
    }
    const rootNum = nums[0];

    const largerNums = [];
    const smallerNums = [];

    for (const num of nums)
    {
        if (num > rootNum)
        {
            largerNums.push(num);
        }
        else if (num < rootNum)
        {
            smallerNums.push(num);
        }
    }

    const leftCount = dfs(smallerNums);
    const rightCount = dfs(largerNums);

    const largerCount = BigInt(Math.max(largerNums.length, smallerNums.length));
    const smallerCount = BigInt(Math.min(largerNums.length, smallerNums.length));

    let rearrangeCount = 0n;

    // 有一个集合是空的，那么只有一种排列
    if (smallerCount === 0n)
    {
        rearrangeCount = 1n;
    }
    else
    {
        // 在大小较小的集合中插入 i 个板分成 i+1 份
        for (let i = 0n; i <= smallerCount - 1n; i++)
        {
            // 把 i+1 份放入 largerCount+1 个位置中
            rearrangeCount += (combination(smallerCount - 1n, i) * combination(largerCount + 1n, i + 1n));
        }
    }

    return leftCount * rightCount * rearrangeCount;
}

/**
 * 
 * @param {bigint} m 
 * @param {bigint} n 
 * @returns {bigint}
 */
function combination(m, n)
{
    return factorial(m) / (factorial(n) * factorial(m - n));
}

const factorialCache = new Map();
/**
 * 
 * @param {bigint} n 
 * @returns {bigint}
 */
function factorial(n)
{
    if (factorialCache.has(n))
    {
        return factorialCache.get(n);
    }
    let result = 1n;
    for (let i = 2n; i <= n; i++)
    {
        result *= i;
    }
    factorialCache.set(n, result);
    return result;
}
// @lc code=end


console.log(numOfWays([10, 23, 12, 18, 4, 29, 2, 8, 41, 31, 25, 21, 14, 35, 26, 5, 19, 43, 22, 37, 9, 20, 44, 28, 1, 39, 30, 38, 36, 6, 13, 16, 27, 17, 34, 7, 15, 3, 11, 24, 42, 33, 40, 32]));

/*
[10,23,12,18,4,29,2,8,41,31,25,21,14,35,26,5,19,43,22,37,9,20,44,28,1,39,30,38,36,6,13,16,27,17,34,7,15,3,11,24,42,33,40,32]
182440977
*/