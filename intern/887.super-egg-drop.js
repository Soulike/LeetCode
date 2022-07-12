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
var superEggDrop = function (K, N) {
    const cache = new Map();
    /**
     * 在 [1-N] 层扔鸡蛋，还剩下 K 个鸡蛋可以扔，最坏情况下最少的尝试次数
     */
    function helper(K, N) {
        const cacheKey = `${K}-${N}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }
        // 就剩下一个鸡蛋了，只能逐层尝试
        if (K === 1) {
            return N; // 最坏情况下一直尝试到楼顶
        }
        if (N === 0) {
            return 0;
        }

        let minTimes = Infinity;
        // 每一层都尝试扔一下
        /* for (let i = 1; i <= N; i++)
        {
            // 在这一层碎了，1到i-1层
            const brokenTimes = helper(K - 1, i - 1);
            // 在这一层没碎，i+1到N层
            const notBrokenTimes = helper(K, N - i);

            minTimes = Math.min(minTimes,
                Math.max(brokenTimes, notBrokenTimes) + 1);
        } */

        /**
         * helper(K,N) 在 K 确定时是一个关于 N 的单调递增函数
         * 那么 helper(K - 1, i - 1) 关于 i 递增
         * helper(K, N - i) 关于 i 递减
         * 根据 minTimes = Math.min(minTimes,
                Math.max(brokenTimes, notBrokenTimes) + 1);
         * 我们需要求出两个函数关于 i 时在图像上的交点
         * 使用二分法
         */

        let left = 1;
        let right = N;

        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            // 在这一层碎了，1到i-1层
            const brokenTimes = helper(K - 1, mid - 1);
            // 在这一层没碎，i+1到N层
            const notBrokenTimes = helper(K, N - mid);

            if (brokenTimes > notBrokenTimes) {
                minTimes = Math.min(minTimes, brokenTimes + 1);
                right = mid - 1;
            } else {
                minTimes = Math.min(minTimes, notBrokenTimes + 1);
                left = mid + 1;
            }
        }

        cache.set(cacheKey, minTimes);
        return minTimes;
    }

    const result = helper(K, N);
    return result;
};
// @lc code=end
