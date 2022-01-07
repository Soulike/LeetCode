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
    /** 从 start 到结点 i 的最短路径 */
    const minDelaysFromStart = new Array(n);
    minDelaysFromStart.fill(Number.POSITIVE_INFINITY);
    minDelaysFromStart[k - 1] = 0;  // start 到自己是 0

    /** 邻接矩阵 */
    const matrix = new Array(n);
    for (let i = 0; i < n; i++)
    {
        matrix[i] = new Array(n);
        matrix[i].fill(Number.POSITIVE_INFINITY);
        matrix[i][i] = 0;
    }

    for (const [from, to, delay] of times)
    {
        matrix[from - 1][to - 1] = delay;
        if (from === k)
        {
            minDelaysFromStart[to - 1] = delay;
        }
    }

    const processedNodes = new Set([k - 1]);
    const unprocessedNodes = new Set();
    for (let i = 0; i < n; i++)
    {
        if (i !== k - 1)
        {
            unprocessedNodes.add(i);
        }
    }

    while (processedNodes.size < n)
    {
        // 在已处理结点集合中寻找邻接的结点 n，使得 start 到 n 的距离最短
        let minFrom = -1;
        let minTo = -1;
        let minDelay = Number.POSITIVE_INFINITY;
        for (const from of processedNodes)
        {
            const toDelays = matrix[from];
            for (let to = 0; to < n; to++)
            {
                if (!processedNodes.has(to) && minDelaysFromStart[from] + toDelays[to] < minDelay)
                {
                    minFrom = from;
                    minTo = to;
                    minDelay = minDelaysFromStart[from] + toDelays[to];
                }
            }
        }

        // 图中有孤立结点
        if (minDelay === Number.POSITIVE_INFINITY)
        {
            break;
        }

        minDelaysFromStart[minTo] = Math.min(minDelaysFromStart[minTo], minDelay);
        unprocessedNodes.delete(minTo);
        processedNodes.add(minTo);
    }

    const maxDelay = Math.max(...minDelaysFromStart);
    return maxDelay === Number.POSITIVE_INFINITY ? -1 : maxDelay;
};
// @lc code=end