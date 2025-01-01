/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
 */

// @lc code=start

/**
 * @param {Node | null} root
 * @return {Node | null}
 */
var connect = function (root) {
  if (root === null) {
    return null;
  }

  let currentLevelFirstNode = root;
  let currentLevelPrevNode = null;
  let currentLevelNode = root;

  while (currentLevelFirstNode.left !== null) {
    while (currentLevelNode !== null) {
      if (currentLevelPrevNode !== null) {
        currentLevelPrevNode.right.next = currentLevelNode.left;
      }
      currentLevelNode.left.next = currentLevelNode.right;
      currentLevelPrevNode = currentLevelNode;
      currentLevelNode = currentLevelNode.next;
    }

    currentLevelFirstNode = currentLevelFirstNode.left;
    currentLevelNode = currentLevelFirstNode;
    currentLevelPrevNode = null;
  }

  return root;
};
// @lc code=end
