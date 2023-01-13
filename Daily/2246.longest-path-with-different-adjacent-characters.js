/*
 * @lc app=leetcode id=2246 lang=javascript
 *
 * [2246] Longest Path With Different Adjacent Characters
 */

// @lc code=start
/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function (parent, s) {
    const children = parentToChildren(parent);
    const N = s.length;

    /** @type {[number, number][]} */
    const memo = [];

    /**
     * @param {number} root
     * @returns {[number, number]} - The 2 longest paths following the children of root (root included)
     */
    const dfs = (root) => {
        if (memo[root] !== undefined) {
            return memo[root];
        }

        const rootValue = s[root];

        const rootChildren = children[root];

        if (rootChildren.length === 0) {
            /** @type {[number, number]} */
            const result = [1, 1];
            memo[root] = result;
            return result;
        }

        /** @type {number[]} */
        const childrenLongestPathsLength = [];

        for (const child of rootChildren) {
            const childValue = s[child];
            if (childValue === rootValue) {
                childrenLongestPathsLength.push(1);
            } else {
                const childLongestPathsLength = dfs(child);
                childrenLongestPathsLength.push(1 + childLongestPathsLength[0]);
            }
        }

        if (childrenLongestPathsLength.length >= 2) {
            childrenLongestPathsLength.sort((a, b) => b - a);

            memo[root] = [
                childrenLongestPathsLength[0],
                childrenLongestPathsLength[1],
            ];
        } else {
            memo[root] = [childrenLongestPathsLength[0], 1];
        }

        return memo[root];
    };

    let longestPathLength = 0;
    for (let i = 0; i < N; i++) {
        const childLongestPathLengths = dfs(i);
        longestPathLength = Math.max(
            longestPathLength,
            childLongestPathLengths[0] + childLongestPathLengths[1] - 1,
        );
    }

    return longestPathLength;
};

/**
 * @param {number[]} parent
 * @returns {number[][]}
 */
function parentToChildren(parent) {
    const N = parent.length;

    /** @type {number[][]} */
    const children = [];
    for (let i = 0; i < N; i++) {
        children.push([]);
    }

    for (let i = 1; i < parent.length; i++) {
        children[parent[i]].push(i);
    }

    return children;
}
// @lc code=end
