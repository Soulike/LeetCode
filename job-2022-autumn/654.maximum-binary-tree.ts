/*
 * @lc app=leetcode id=654 lang=typescript
 *
 * [654] Maximum Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  return helper(nums, 0, nums.length - 1);
}

function helper(nums: number[], left: number, right: number): TreeNode | null {
  if (left > right) return null;

  let maxValInRange = -Infinity;
  let maxValIndexInRange = -1;

  for (let i = left; i <= right; i++) {
    if (nums[i] > maxValInRange) {
      maxValInRange = nums[i];
      maxValIndexInRange = i;
    }
  }

  const leftChild = helper(nums, left, maxValIndexInRange - 1);
  const rightChild = helper(nums, maxValIndexInRange + 1, right);

  const root = new TreeNode(maxValInRange, leftChild, rightChild);

  return root;
}
// @lc code=end
