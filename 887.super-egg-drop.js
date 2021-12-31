/*
 * @lc app=leetcode id=887 lang=javascript
 *
 * [887] Super Egg Drop
 */

// @lc code=start
/**
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N)
{
    let memo = {};

    let dp = function (K, N)
    {
        // base case
        if (K === 1) return N;
        if (N === 0) return 0;

        // 避免重复计算
        let key = K + ',' + N;
        if (memo[key] !== undefined)
        {
            return memo[key];
        }

        // 正无穷
        let res = Infinity;

        // 用二分搜索代替线性搜索
        let lo = 1, hi = N;
        while (lo <= hi)
        {
            let mid = Math.floor((lo + hi) / 2);
            let broken = dp(K - 1, mid - 1); // 碎
            let not_broken = dp(K, N - mid); //  没碎

            // res = min(max(碎，没碎) + 1)
            if (broken > not_broken)
            {
                hi = mid - 1;
                res = Math.min(res, broken + 1);
            } else
            {
                lo = mid + 1;
                res = Math.min(res, not_broken + 1);
            }
        }


        // 记入备忘录
        memo[key] = res;
        return res;
    };

    return dp(K, N);
};
// @lc code=end

