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
    const TARGET = graph.length - 1;
    const pathsCache = new Map();

    function helper(start)
    {
        if (pathsCache.has(start))
        {
            return pathsCache.get(start);
        }

        let result;

        if (start === TARGET)
        {
            result = [[TARGET]];
        }
        else
        {
            const tos = graph[start];
            if (tos.length === 0)
            {
                result = null;
            }
            else
            {
                const paths = [];
                for (const to of tos)
                {
                    const subPaths = helper(to);
                    if (subPaths !== null)
                    {
                        for (const subPath of subPaths)
                        {
                            paths.push([start,...subPath]);
                        }
                    }
                }
                if (paths.length === 0)
                {
                    result = null;
                }
                else
                {
                    result = paths;
                }
            }
        }

        pathsCache.set(start, result);
        return result;
    }  

    const paths = helper(0);
    if (paths === null)
    {
        return [];
    }
    return paths;
};
// @lc code=end

allPathsSourceTarget([[1, 2], [3], [3], []])