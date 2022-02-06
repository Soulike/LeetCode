/*
 * @lc app=leetcode id=797 lang=javascript
 *
 * [797] All Paths From Source to Target
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph)
{
    const START = 0;
    const TARGET = graph.length - 1;

    let currentPath = [];
    let paths = [];

    function helper(start)
    {
        currentPath.push(start);
        if (start === TARGET)
        {
            paths.push(Array.from(currentPath));
        }
        else
        {
            const tos = graph[start];
            for (const to of tos)
            {
                helper(to);
            }
        }
        currentPath.pop();
    }

    helper(START);
    return paths;
};
// @lc code=end