/*
 * @lc app=leetcode id=743 lang=javascript
 *
 * [743] Network Delay Time
 */

// @lc code=start
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k)
{
    const delayMatrix = new Array(n);
    for (let i = 0; i < n; i++)
    {
        delayMatrix[i] = new Array(n);
        delayMatrix[i].fill(Number.POSITIVE_INFINITY);
        delayMatrix[i][i] = 0;
    }
    for (const [from, to, delay] of times)
    {
        delayMatrix[from - 1][to - 1] = delay;
    }

    let hasChange = true;

    while (hasChange)
    {
        hasChange = false;
        for (let from = 0; from < n; from++)
        {
            for (let to = 0; to < n; to++)
            {
                if (from !== to)
                {
                    for (let mid = 0; mid < n; mid++)
                    {
                        if (mid !== from && mid !== to)
                        {
                            const delayThroughMid = delayMatrix[from][mid] + delayMatrix[mid][to];
                            if (delayThroughMid < delayMatrix[from][to])
                            {
                                delayMatrix[from][to] = delayThroughMid;
                                hasChange = true;
                            }
                        }
                    }
                }
            }
        }
    }

    const maxDelay = Math.max(...delayMatrix[k - 1]);

    return maxDelay === Number.POSITIVE_INFINITY ? -1 : maxDelay;
};
// @lc code=end

