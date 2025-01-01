/*
 * @lc app=leetcode id=652 lang=typescript
 *
 * [652] Find Duplicate Subtrees
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

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  const traverseResults = new Set<string>();
  const loggedSubtreeTraverseResults = new Set<string>();
  const duplicateSubtrees: TreeNode[] = [];

  helper(
    root,
    traverseResults,
    loggedSubtreeTraverseResults,
    duplicateSubtrees,
  );

  return duplicateSubtrees;
}

function helper(
  root: TreeNode | null,
  traverseResults: Set<string>,
  loggedSubtreeTraverseResults: Set<string>,
  duplicateSubtrees: TreeNode[],
): string {
  if (root === null) return '#';
  const leftChildPostorder = helper(
    root.left,
    traverseResults,
    loggedSubtreeTraverseResults,
    duplicateSubtrees,
  );
  const rightChildPostorder = helper(
    root.right,
    traverseResults,
    loggedSubtreeTraverseResults,
    duplicateSubtrees,
  );

  const postorder = [leftChildPostorder, rightChildPostorder, root.val].join(
    ',',
  );
  if (
    !loggedSubtreeTraverseResults.has(postorder) &&
    traverseResults.has(postorder)
  ) {
    duplicateSubtrees.push(root);
    loggedSubtreeTraverseResults.add(postorder);
  }
  traverseResults.add(postorder);
  return postorder;
}
// @lc code=end
