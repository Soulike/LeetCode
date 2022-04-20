/*
 * @lc app=leetcode id=173 lang=javascript
 *
 * [173] Binary Search Tree Iterator
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
class BSTIterator
{
    #iterator;
    #value;
    #done;
    
    /**
     * @param {TreeNode} root
     */
    constructor(root)
    {
        this.#iterator = this.#getInorderIterator(root);
        const {value, done} = this.#iterator.next();
        this.#value = value;
        this.#done = done;
    }

    /**
     * @return {number}
     */
    next()
    {
        const originalValue = this.#value;
        const {value, done} = this.#iterator.next();
        this.#value = value;
        this.#done = done;
        return originalValue;
    }

    /**
     * @return {boolean}
     */
    hasNext()
    {
        return !this.#done;
    }

    /**
     * 
     * @param {TreeNode} root 
     */
    *#getInorderIterator(root)
    {
        if (root === null)
        {
            return;
        }

        yield* this.#getInorderIterator(root.left);
        yield root.val;
        yield* this.#getInorderIterator(root.right);
    }
}



/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

