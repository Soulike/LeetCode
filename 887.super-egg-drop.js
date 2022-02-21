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
    const cache = {};
    /**
     * 在 [1-N] 层扔鸡蛋，还剩下 K 个鸡蛋可以扔，最坏情况下最少的尝试次数
     */
    function helper(K, N)
    {
        const cacheKey = `${K}-${N}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        // 就剩下一个鸡蛋了，只能逐层尝试
        if (K === 1)
        {
            return N;   // 最坏情况下一直尝试到楼顶
        }
        if (N === 0)
        {
            return 0;
        }

        let minTimes = Infinity;
        // 每一层都尝试扔一下
        for (let i = 1; i <= N; i++)
        {
            // 在这一层碎了，1到i-1层
            const brokenTimes = helper(K - 1, i - 1);
            // 在这一层没碎，i+1到N层
            const notBrokenTimes = helper(K, N - i);

            minTimes = Math.min(minTimes,
                Math.max(brokenTimes, notBrokenTimes) + 1);
        }

        cache.set(cacheKey, minTimes);
        return minTimes;
    }

    const result = helper(K, N);
    return result;
};
// @lc code=end

console.log(superEggDrop(4, 5000));