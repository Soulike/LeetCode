/*
 * @lc app=leetcode id=450 lang=javascript
 *
 * [450] Delete Node in a BST
 */

class TreeNode {
    /**
     * @param {number} val
     * @param {TreeNode|null} left
     * @param {TreeNode|null} right
     */
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// @lc code=start
/**
 * @param {TreeNode|null} root
 * @param {number} key
 * @return {TreeNode|null}
 */
const deleteNode = function (root, key) {
    if (root === null) {
        return root;
    }

    /**@type {TreeNode|null}*/
    let currentNode = root;
    /**@type {TreeNode|null}*/
    let prevNode = null;
    let isLeftChild = false;
    while (currentNode.val !== key) {
        prevNode = currentNode;
        if (key > currentNode.val) {
            prevNode = currentNode;
            isLeftChild = false;
            currentNode = currentNode.right;
        } else if (key < currentNode.val) {
            isLeftChild = true;
            currentNode = currentNode.left;
        }
        if (currentNode === null) {
            return root;
        }
    }

    const deletedNode = currentNode;

    if (currentNode.left === null && currentNode.right === null) {
        if (prevNode === null) {
            return null;
        } else if (isLeftChild) {
            prevNode.left = null;
        } else {
            prevNode.right = null;
        }
    } else if (currentNode.left !== null && currentNode.right === null) {
        if (prevNode === null) {
            return currentNode.left;
        } else if (isLeftChild) {
            prevNode.left = currentNode.left;
        } else {
            prevNode.right = currentNode.left;
        }
    } else if (currentNode.left === null && currentNode.right !== null) {
        if (prevNode === null) {
            return currentNode.right;
        } else if (isLeftChild) {
            prevNode.left = currentNode.right;
        } else {
            prevNode.right = currentNode.right;
        }
    } else {
        prevNode = currentNode;
        currentNode = currentNode.right;
        if (currentNode.left === null) {
            deletedNode.val = currentNode.val;
            deletedNode.right = currentNode.right;
        } else {
            while (currentNode.left !== null) {
                prevNode = currentNode;
                currentNode = currentNode.left;
            }
            prevNode.left = currentNode.right;
            deletedNode.val = currentNode.val;
        }
    }
    return root;
};
// @lc code=end
