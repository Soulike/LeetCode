/*
 * @lc app=leetcode id=785 lang=javascript
 *
 * [785] Is Graph Bipartite?
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph)
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
            return colors[i] === color
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