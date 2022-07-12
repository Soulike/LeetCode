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
var allPathsSourceTarget = function (graph) {
    const START = 0;
    const TARGET = graph.length - 1;

    let currentPath = [START];
    let paths = [];

    function helper(start) {
        if (start === TARGET) {
            paths.push(Array.from(currentPath));
        } else {
            const nodes = graph[start];
            for (const node of nodes) {
                currentPath.push(node);
                helper(node);
                currentPath.pop();
            }
        }
    }

    helper(START);
    return paths;
};
// @lc code=end
