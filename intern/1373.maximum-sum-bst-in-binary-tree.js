/*
 * @lc app=leetcode id=1373 lang=javascript
 *
 * [1373] Maximum Sum BST in Binary Tree
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
var maxSumBST = function (root) {
    let maxSum = 0;

    traverse(root);

    return maxSum;

    /**
     * @returns {{isValid: boolean, sum?: number, min?: number, max?: number}} - root 是否是一个合法的 BST？如果是，该树的数字和是多少，树中最大最小值分别是多少？
     */
    function traverse(root) {
        if (root === null) {
            return {
                isValid: true,
                sum: 0,
                min: Infinity,
                max: -Infinity,
            };
        }
        const leftResult = traverse(root.left);
        const rightResult = traverse(root.right);
        if (leftResult.isValid && rightResult.isValid) {
            if (root.val > leftResult.max && root.val < rightResult.min) {
                const sum = root.val + leftResult.sum + rightResult.sum;
                maxSum = Math.max(maxSum, sum);
                return {
                    isValid: true,
                    sum,
                    min:
                        leftResult.min === Infinity ? root.val : leftResult.min,
                    max:
                        rightResult.max === -Infinity
                            ? root.val
                            : rightResult.max,
                };
            } else {
                return {
                    isValid: false,
                };
            }
        } else {
            return {
                isValid: false,
            };
        }
    }
};
// @lc code=end
