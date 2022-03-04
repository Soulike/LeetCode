/*
 * @lc app=leetcode id=1381 lang=javascript
 *
 * [1381] Design a Stack With Increment Operation
 */

// @lc code=start
/**
 * @param {number} maxSize
 */
class CustomStack
{
    stack;
    top;

    constructor(maxSize)
    {
        this.stack = new Array(maxSize);
        this.top = 0;
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x)
    {
        if (this.top < this.stack.length)
        {
            this.stack[this.top] = x;
            this.top++;
        }
    }

    /**
     * @return {number}
     */
    pop()
    {
        if (this.top === 0)
        {
            return -1;
        }
        this.top--;
        return this.stack[this.top];
    }

    /**
     * @param {number} k
     * @param {number} val
     * @return {void}
     */
    increment(k, val)
    {
        for (let i = 0; i < Math.min(k, this.top); i++)
        {
            this.stack[i] += val;
        }
    }
}




/** 
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
// @lc code=end

