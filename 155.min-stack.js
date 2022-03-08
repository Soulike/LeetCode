/*
 * @lc app=leetcode id=155 lang=javascript
 *
 * [155] Min Stack
 */

// @lc code=start

class MinStack
{
    /**
     * @type {[number, number][]} - [val, minValWhenPushed]
     */
    stack;

    constructor()
    {
        this.stack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val)
    {
        if(this.stack.length === 0)
        {
            this.stack.push([val, val]);
        }
        else
        {
            const top = this.stack[this.stack.length - 1];
            this.stack.push([val, Math.min(val, top[1])]);
        }
    }

    /**
     * @return {void}
     */
    pop()
    {
        this.stack.pop()
    }

    /**
     * @return {number}
     */
    top()
    {
        return this.stack[this.stack.length - 1][0];
    }

    /**
     * @return {number}
     */
    getMin()
    {
        return this.stack[this.stack.length - 1][1];
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