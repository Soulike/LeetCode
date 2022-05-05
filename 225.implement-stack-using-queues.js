/*
 * @lc app=leetcode id=225 lang=javascript
 *
 * [225] Implement Stack using Queues
 */

// @lc code=start

class MyStack
{
    /** @type {number[]} */
    queue;

    constructor()
    {
        this.queue = [];
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x)
    {
        this.queue.push(x);
    }

    /**
     * @return {number}
     */
    pop()
    {
        const n = this.queue.length;

        for (let i = 0; i < n - 1; i++)
        {
            this.queue.push(this.queue.shift());
        }

        return this.queue.shift();
    }

    /**
     * @return {number}
     */
    top()
    {
        const n = this.queue.length;

        for (let i = 0; i < n - 1; i++)
        {
            this.queue.push(this.queue.shift());
        }

        const top = this.queue[0];

        this.queue.push(this.queue.shift());

        return top;
    }

    /**
     * @return {boolean}
     */
    empty()
    {
        return this.queue.length === 0;
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

