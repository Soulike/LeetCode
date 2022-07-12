/*
 * @lc app=leetcode id=1261 lang=javascript
 *
 * [1261] Find Elements in a Contaminated Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
class FindElements {
    #root;

    static #LEFT = 0;
    static #RIGHT = 1;

    constructor(root) {
        this.#root = root;
    }

    /**
     * @param {number} target
     * @return {boolean}
     */
    find(target) {
        let current = target;
        const path = [];

        while (current > 0) {
            if (current % 2 === 0) {
                current = (current - 2) / 2;
                path.push(FindElements.#RIGHT);
            } else {
                current = (current - 1) / 2;
                path.push(FindElements.#LEFT);
            }
        }

        let currentNode = this.#root;
        for (let i = path.length - 1; i >= 0; i--) {
            const direction = path[i];
            if (direction === FindElements.#LEFT) {
                currentNode = currentNode.left;
            } else if (direction === FindElements.#RIGHT) {
                currentNode = currentNode.right;
            }

            if (currentNode === null) {
                return false;
            }
        }

        return true;
    }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
// @lc code=end
