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
    function helper(start)
    {
        if (start === TARGET)
        {
            return [[TARGET]];
        }
        else
        {
            const tos = graph[start];
            if (tos.length === 0)
            {
                return null;
            }
            else
            {
                const results = [];
                for (const to of tos)
                {
                    const subPaths = helper(to);
                    if (subPaths !== null)
                    {
                        for (const subPath of subPaths)
                        {
                            subPath.push(start);
                            results.push(subPath);
                        }
                    }
                }
                if (results.length === 0)
                {
                    return null;
                }
                else
                {
                    return results;
                }
            }
        }
    }  

    const paths = helper(0);
    if (paths === null)
    {
        return [];
    }
    return paths.map(path => path.reverse());
};
// @lc code=end

allPathsSourceTarget([[1, 2], [3], [3], []])