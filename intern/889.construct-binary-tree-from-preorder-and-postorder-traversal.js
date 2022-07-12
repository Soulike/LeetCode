/*
 * @lc app=leetcode id=889 lang=javascript
 *
 * [889] Construct Binary Tree from Preorder and Postorder Traversal
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

// @lc code=start
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
    return helper(0, preorder.length, 0, postorder.length);

    function helper(
        preorderLeft,
        preorderRight,
        postorderLeft,
        postorderRight,
    ) {
        const LENGTH = preorderRight - preorderLeft;
        if (LENGTH === 0) {
            return null;
        }
        const root = new TreeNode(preorder[preorderLeft]);
        const preorderLeftTreeValSet = new Set();
        const postorderLeftTreeValSet = new Set();

        for (let i = 1; i < LENGTH; i++) {
            preorderLeftTreeValSet.add(preorder[preorderLeft + i]);
            postorderLeftTreeValSet.add(postorder[postorderLeft + i - 1]);
            if (setEqual(preorderLeftTreeValSet, postorderLeftTreeValSet)) {
                const leftTree = helper(
                    preorderLeft + 1,
                    preorderLeft + i + 1,
                    postorderLeft,
                    postorderLeft + i,
                );
                const rightTree = helper(
                    preorderLeft + i + 1,
                    preorderRight,
                    postorderLeft + i,
                    postorderRight - 1,
                );
                root.left = leftTree;
                root.right = rightTree;
                break;
            }
        }
        return root;
    }
};

function setEqual(set1, set2) {
    for (const val of set2) {
        if (!set1.has(val)) {
            return false;
        }
    }
    return true;
}
// @lc code=end
