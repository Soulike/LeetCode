/*
 * @lc app=leetcode id=650 lang=javascript
 *
 * [650] 2 Keys Keyboard
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n)
{
    /**
     * 状态
     * 已经输入了多少？
     * 剪切板里面字符的数量？
     * 
     * 转移
     * 复制
     * 粘贴
     */

    const cache = new Map();
    /**
     * @returns {number} - 在当前状态下，所需要的最小操作次数。如果不可能，返回 Infinity
     */
    function helper(inputtedCount, clipboardCount)
    {
        const cacheKey = `${inputtedCount}-${clipboardCount}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (inputtedCount > n)
        {
            return Infinity;
        }

        if (inputtedCount === n)
        {
            return 0;
        }

        let result = Infinity;

        // 剪切板是空的，只能复制
        if (clipboardCount === 0)
        {
            const doCopyRestStepCount = helper(inputtedCount, inputtedCount);

            result = 1 + doCopyRestStepCount;
        }
        // 剪切板大小和文本不一致，两种选择
        else if (inputtedCount > clipboardCount)
        {
            const doCopyRestStepCount = helper(inputtedCount, inputtedCount);
            const doPasteRestStepCount = helper(inputtedCount + clipboardCount, clipboardCount);

            result = 1 + Math.min(doCopyRestStepCount, doPasteRestStepCount);
        }
        // 剪切板大小和文本一样，只能粘贴
        else
        {
            const doPasteRestStepCount = helper(inputtedCount + clipboardCount, clipboardCount);
            result = 1 + doPasteRestStepCount;
        }

        cache.set(cacheKey, result);
        return result;
    }

    return helper(1, 0);
};
// @lc code=end

console.log(minSteps(1000));