/*
 * @lc app=leetcode id=514 lang=javascript
 *
 * [514] Freedom Trail
 */

// @lc code=start
/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function (ring, key)
{
    const keyToIndexesOnRing = new Map();
    for (let i = 0; i < ring.length;i++)
    {
        const key = ring[i];
        if (keyToIndexesOnRing.has(key))
        {
            const indexesOnRing = keyToIndexesOnRing.get(key);
            indexesOnRing.add(i)
        }
        else
        {
            const indexesOnRing = new Set();
            indexesOnRing.add(i)
            keyToIndexesOnRing.set(key, indexesOnRing);
        }
    }

    const cache = new Map();
    /**
     * 在下一个要按的字母是 currentKeyIndex ，且当前转盘指向 currentRingIndex 的情况下，完成剩下按键任务所需的最小步骤
     */
    function helper(currentKeyIndex, currentRingIndex)
    {
        const cacheKey = `${currentKeyIndex}-${currentRingIndex}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (currentKeyIndex === key.length)
        {
            return 0;
        }
        const currentKey = key[currentKeyIndex];
        const currentKeyIndexesOnRing = keyToIndexesOnRing.get(currentKey);

        let minStepCount = Infinity;
        for (const keyIndexesOnRing of currentKeyIndexesOnRing)
        {
            const largerIndex = Math.max(keyIndexesOnRing, currentRingIndex);
            const lessIndex = Math.min(keyIndexesOnRing, currentRingIndex);
            const minStepCountToCurrentKey = Math.min(
                largerIndex - lessIndex,
                lessIndex - largerIndex + ring.length
            );
            minStepCount = Math.min(
                minStepCount,
                helper(currentKeyIndex + 1, keyIndexesOnRing) + minStepCountToCurrentKey + 1);
        }
        cache.set(cacheKey, minStepCount);
        return minStepCount;
    }

    return helper(0, 0);
};
// @lc code=end