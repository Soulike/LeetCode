/*
 * @lc app=leetcode id=886 lang=javascript
 *
 * [886] Possible Bipartition
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes)
{
    const graph = new Array(n);
    for (let i = 0; i < graph.length; i++)
    {
        graph[i] = [];
    }
    for (const [a, b] of dislikes)
    {
        graph[a - 1].push(b - 1);
        graph[b - 1].push(a - 1);
    }

    return isBipartite(graph);
};

/**
 * @param {number[][]} graph8
 * @return {boolean}
 */
function isBipartite(graph)
{
    const n = graph.length;
    const colors = new Array(n);
    const NO_COLOR = 0;
    const COLOR_1 = 1;
    const COLOR_2 = 2;
    colors.fill(NO_COLOR);

    function canFinishPaint(i, color)
    {
        if (colors[i] !== NO_COLOR)
        {
            return colors[i] === color;
        }
        else
        {
            colors[i] = color;
            const connectedNodes = graph[i];
            for (const node of connectedNodes)
            {
                if (!canFinishPaint(node, color === COLOR_1 ? COLOR_2 : COLOR_1))
                {
                    return false;
                }
            }
            return true;
        }
    }

    for (let i = 0; i < n; i++)
    {
        if (colors[i] === NO_COLOR)
        {
            if (!canFinishPaint(i, COLOR_1))
            {
                return false;
            }
        }
    }

    return true;
};
// @lc code=end