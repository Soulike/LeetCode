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
        let minTo = 0;
        let minToDelay = Number.POSITIVE_INFINITY;
        for (const unprocessedNode of unprocessedNodes)
        {
            if (minDelaysFromStart[unprocessedNode] < minToDelay)
            {
                minToDelay = minDelaysFromStart[unprocessedNode];
                minTo = unprocessedNode;
            }
        }

        if (minToDelay === Number.POSITIVE_INFINITY)
        {
            return -1;
        }

        for (let i = 0; i < n; i++)
        {
            minDelaysFromStart[i] = Math.min(minDelaysFromStart[i], minDelaysFromStart[minTo] + matrix[minTo][i]);
        }

        processedNodes.add(minTo);
        unprocessedNodes.delete(minTo);
    }

    const maxDelay = Math.max(...minDelaysFromStart);
    return maxDelay === Number.POSITIVE_INFINITY ? -1 : maxDelay;
};
// @lc code=end