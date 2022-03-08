/*
 * @lc app=leetcode id=155 lang=javascript
 *
 * [155] Min Stack
 */

// @lc code=start

class MinStack
{
    stack;
    minValStack;

    constructor()
    {
        this.stack = [];
        this.minValStack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val)
    {
        this.stack.push(val);
        if (this.minValStack.length === 0
            || this.minValStack[this.minValStack.length - 1] >= val)
        {
            this.minValStack.push(val);
        }
    }

    /**
     * @return {void}
     */
    pop()
    {
        const poppedVal = this.stack.pop();
        if (this.minValStack[this.minValStack.length - 1] === poppedVal)
        {
            this.minValStack.pop();
        }
    }

    /**
     * @return {number}
     */
    top()
    {
        return this.stack[this.stack.length - 1];
    }

    /**
     * @return {number}
     */
    getMin()
    {
        return this.minValStack[this.minValStack.length - 1];
    }
}
/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end