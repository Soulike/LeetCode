/*
 * @lc app=leetcode id=684 lang=javascript
 *
 * [684] Redundant Connection
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges)
{
    const n = edges.length;
    const connectDegree = new Array(n + 1);
    connectDegree.fill(0);
    const nodeToConnectedNodes = new Map();

    for (const [a, b] of edges)
    {
        connectDegree[a]++;
        connectDegree[b]++;

        const aConnected = nodeToConnectedNodes.get(a) ?? [];
        aConnected.push(b);
        nodeToConnectedNodes.set(a, aConnected);

        const bConnected = nodeToConnectedNodes.get(b) ?? [];
        bConnected.push(a);
        nodeToConnectedNodes.set(b, bConnected);

    }

    let found = true;
    while (found)
    {
        found = false;
        for (let i = 1; i < n + 1; i++)
        {
            if (connectDegree[i] === 1)
            {
                found = true;
                connectDegree[i] = 0;

                const connectedNodes = nodeToConnectedNodes.get(i);
                for (const node of connectedNodes)
                {
                    if (connectDegree[node] > 0)
                    {
                        connectDegree[node]--;
                    }
                }
            }
        }
    }

    for (let i = n - 1; i >= 0; i--)
    {
        const [a, b] = edges[i];
        if (connectDegree[a] !== 0 && connectDegree[b] !== 0)
        {
            return [a, b];
        }
    }
};
// @lc code=end