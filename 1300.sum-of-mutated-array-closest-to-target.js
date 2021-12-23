/*
 * @lc app=leetcode id=1300 lang=javascript
 *
 * [1300] Sum of Mutated Array Closest to Target
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const findBestValue = function (arr, target)
{
    arr.sort((a, b) => a - b);

    const average = Math.floor(target / arr.length);

    // 最小的数字也比平均数大，那么最佳的就是平均数或者平均数+1
    if (arr[0] > average)
    {
        const averageResult = average * arr.length;
        const averagePlusResult = (average + 1) * arr.length;
        return Math.abs(target - averageResult) <= Math.abs(target - averagePlusResult)
            ? average
            : average + 1;
    }

    // 最大的数字也比平均数小，那么最佳的就是数组最大的数
    if (arr[arr.length - 1] <= average)
    {
        return arr[arr.length - 1];
    }

    // 平均数在数组中间

    let arrSumEnd = 0; // 计算 arr 部分和的结尾坐标
    /**
     * 到 i 为止的和
     * @type {number[]}
     */
    const arrPartialSum = new Array(arr.length);
    arrPartialSum[0] = arr[0];
    for (let i = 1; i < arr.length; i++)
    {
        arrPartialSum[i] = arr[i] + arrPartialSum[i - 1];

        if (arr[i] <= average)
        {
            arrSumEnd = i;  // 初始化，只计算平均数之前的
        }
    }

    let currentMutatedArrSum;
    let lastMutatedArrSum = 0;

    for (let currentThreshold = average; ; currentThreshold++)    // 从平均数递增尝试
    {
        // 到了最大值还是没有超过 target，那就返回最大值
        if (currentThreshold > arr[arr.length - 1])
        {
            return arr[arr.length - 1];
        }

        for (let j = arrSumEnd; j < arr.length; j++)    // 找到新的部分和结尾
        {
            if (arr[j] > currentThreshold)
            {
                arrSumEnd = j - 1;
                break;
            }
        }

        currentMutatedArrSum = arrPartialSum[arrSumEnd] + currentThreshold * (arr.length - arrSumEnd - 1);
        if (currentMutatedArrSum === target)
        {
            return currentThreshold;
        }
        else if (currentMutatedArrSum > target)
        {
            // 看看超过和没超过谁更接近，都一样就返回没超过的
            return Math.abs(target - lastMutatedArrSum) <= Math.abs(target - currentMutatedArrSum)
                ? currentThreshold - 1
                : currentThreshold;
        }
        else
        {
            lastMutatedArrSum = currentMutatedArrSum;
        }
    }
};
// @lc code=end