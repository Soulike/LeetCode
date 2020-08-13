/*
 * @lc app=leetcode id=77 lang=javascript
 *
 * [77] Combinations
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 基本思路：递归算法，从小到大，从范围中拿掉一个数 n，从比 n 大的剩余数中递归得到所有取出 k-1 个数的结果数组 recursiveResult，再把当前数放进 recursiveResult 中的每个结果数组中。
 */
const combine = function (n, k) 
{
    return helper(1, n - 1, k);
};

/**
 * @description 组合范围改成 [base...base+n]
 * @param {number} base
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function helper(base, n, k)
{
    if (k === 0)
    {
        return [];
    }
    /**@type {number[][]} */
    const result = [];
    const target = base + n;
    // k<=n+1
    if (k === n + 1)  // 注意 [base...base+n] 中有 n+1 个数
    {
        result.push([]);
        for (let i = base; i <= target; i++)
        {
            result[0].push(i);
        }
    }
    else if (k === 1)   // k < n+1
    {
        for (let i = base; i <= target; i++)
        {
            result.push([i]);
        }
    }
    else    // 1 < k < n+1
    {
        let recursiveResult = [];
        for (let i = 0; i <= n; i++)
        {
            // 注意递归后实际有 n - i - 1 + 1 个数字，因此检查 n - i >= k - 1
            if (n - i >= k - 1)
            {
                // base+n 的值是不变的
                recursiveResult = helper(base + i + 1, n - i - 1, k - 1);
                for (const array of recursiveResult)
                {
                    result.push([base + i, ...array]);
                }
            }
        }
    }
    return result;
}
// @lc code=end