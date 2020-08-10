/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) 
{
    // 保证长是 m 宽是 n
    if (m < n)
    {
        [m, n] = [n, m];
    }
    if (n === 1)
    {
        return 1;
    }
    let result = 0;
    /*
    隔板法。到达目的地机器人需要横向 m-1 步，纵向 n-1 步。
    因此，首先分割 n-1 为 i 组，再从 m-1 中找到 i 个位置插入。
    */
    for (let i = 1; i <= n-1; i++)  // 最少 1 组，最多 n-1 组
    {
        result +=
            split(n - 1, i) // 将 n-1 分割为 i 组有多少种分法
            * comb(m, i); // 在 m-1 的 m 个隔板中找到 i 个位置有多少种方法
    }
    return result;
};

/**
 * @description 一组 amount 数量的东西分割成 splitGroupAmount 组有多少种分割方法
 * @param {number} amount 
 * @param {number} splitGroupAmount 
 * @return {number}
 */
function split(amount, splitGroupAmount)
{
    const m = amount - 1;
    const n = splitGroupAmount - 1;
    return comb(m, n);
}

/**
 * @description 计算组合数 C(m,n)
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function comb(m, n)
{
    n = Math.min(n, m - n);
    if (n === 0)
    {
        return 1;
    }
    if (n === 1)
    {
        return m;
    }
    return times(m - n + 1, m) / times(2, n);
}

/**
 * 
 * @param {number} start 
 * @param {number} end 
 * @return {number}
 */
function times(start, end)
{
    let result = 1;
    for (let i = start; i <= end; i++)
    {
        result *= i;
    }
    return result;
}
// @lc code=end