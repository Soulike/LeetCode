/*
 * @lc app=leetcode id=117 lang=typescript
 *
 * [117] Populating Next Right Pointers in Each Node II
 */

// @lc code=start

function connect(root: Node | null): Node | null {
  if (root === null) {
    return null;
  }

  let nextLevelFirstNode: Node | null = null;
  let currentLevelNode: Node | null = root;
  let nextLevelPrevNode: Node | null = null;

  while (true) {
    while (currentLevelNode !== null) {
      if (currentLevelNode.left !== null && currentLevelNode.right !== null) {
        if (nextLevelFirstNode === null) {
          nextLevelFirstNode = currentLevelNode.left;
        }

        if (nextLevelPrevNode !== null) {
          nextLevelPrevNode.next = currentLevelNode.left;
        }
        currentLevelNode.left.next = currentLevelNode.right;
        nextLevelPrevNode = currentLevelNode.right;
      } else if (currentLevelNode.left !== null) {
        if (nextLevelFirstNode === null) {
          nextLevelFirstNode = currentLevelNode.left;
        }

        if (nextLevelPrevNode !== null) {
          nextLevelPrevNode.next = currentLevelNode.left;
        }

        nextLevelPrevNode = currentLevelNode.left;
      } else if (currentLevelNode.right !== null) {
        if (nextLevelFirstNode === null) {
          nextLevelFirstNode = currentLevelNode.right;
        }

        if (nextLevelPrevNode !== null) {
          nextLevelPrevNode.next = currentLevelNode.right;
        }

        nextLevelPrevNode = currentLevelNode.right;
      }

      currentLevelNode = currentLevelNode.next ?? null;
    }

    if (nextLevelFirstNode === null) break;

    currentLevelNode = nextLevelFirstNode;

    nextLevelPrevNode = null;
    nextLevelFirstNode = null;
  }

  return root;
}
// @lc code=end
