/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * TLE
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height)
{
    const LENGTH = height.length;
    if (LENGTH < 3)
    {
        return 0;
    }

    let water = 0;
    // 极大值点下标
    let indexes = [];

    // 查找极大值点
    // 头
    if (height[0] >= height[1])
    {
        indexes.push(0);
    }
    // 中间
    for (let i = 1; i < LENGTH - 1; i++)
    {
        if (height[i] >= height[i - 1]
            && height[i] >= height[i + 1])
        {
            indexes.push(i);
        }
    }
    // 尾
    if (height[LENGTH - 2] <= height[LENGTH - 1])
    {
        indexes.push(LENGTH - 1);
    }

    // 至少需要两个极值点才能有水
    if (indexes.length < 2)
    {
        return 0;
    }

    // 删掉被两个更大极值包围的极值点
    let removedIndexesIndex = [];
    while (true)
    {
        for (let i = 1; i < indexes.length - 1; i++)
        {
            const currentHeight = height[indexes[i]];
            let leftHeight = height[indexes[i - 1]];
            let rightHeight = height[indexes[i + 1]];

            if (currentHeight <= leftHeight
                && currentHeight <= rightHeight)
            {
                removedIndexesIndex.push(i);
            }
        }

        if (removedIndexesIndex.length === 0)
        {
            break;
        }

        for (let j = removedIndexesIndex.length - 1; j >= 0; j--)
        {
            indexes.splice(removedIndexesIndex[j], 1);
        }
        removedIndexesIndex = [];
    }

    for (let i = 0; i < indexes.length - 1; i++)
    {
        const j = i + 1;
        const leftHeight = height[indexes[i]];
        const rightHeight = height[indexes[j]];
        const waterHeight = Math.min(leftHeight, rightHeight);
        let intervalHeightSum = 0;
        for (let k = indexes[i] + 1; k < indexes[j]; k++)
        {
            // 删掉水下的被占部分
            intervalHeightSum += Math.min(height[k], waterHeight);
        }
        water += waterHeight
            * (indexes[j] - indexes[i] - 1)
            - intervalHeightSum;
    }

    return water;
};
// @lc code=end