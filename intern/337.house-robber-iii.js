/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
 */
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
// @lc code=start
/**
 * @param {TreeNode} root
 * @return {number}
 */
const rob = function (root) {
    const cache = new Map();
    /**
     * 如果抢或者不抢 root，最多能抢到多少钱
     */
    function helper(root, doRob) {
        if (root === null) {
            return 0;
        }

        if (cache.has(root)) {
            const rootCached = cache.get(root);
            if (rootCached[doRob] !== undefined) {
                return rootCached[doRob];
            }
        }

        let result;

        if (doRob) {
            result =
                root.val + helper(root.left, false) + helper(root.right, false);
        } else {
            result =
                Math.max(helper(root.left, true), helper(root.left, false)) +
                Math.max(helper(root.right, true), helper(root.right, false));
        }

        if (cache.has(root)) {
            const rootCached = cache.get(root);
            rootCached[doRob] = result;
        } else {
            cache.set(root, {[doRob]: result});
        }

        return result;
    }

    return Math.max(helper(root, true), helper(root, false));
};

// @lc code=end
