/*
 * @lc app=leetcode id=232 lang=javascript
 *
 * [232] Implement Queue using Stacks
 */

// @lc code=start

class MyQueue {
    /** @type {number[]} */
    #leftStack;
    /** @type {number[]} */
    #rightStack;

    constructor() {
        this.#leftStack = [];
        this.#rightStack = [];
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        while (this.#rightStack.length > 0) {
            this.#leftStack.push(this.#rightStack.pop());
        }
        this.#leftStack.push(x);
    }

    /**
     * @return {number}
     */
    pop() {
        const head = this.peek();
        this.#rightStack.pop();
        return head;
    }

    /**
     * @return {number}
     */
    peek() {
        while (this.#leftStack.length > 0) {
            this.#rightStack.push(this.#leftStack.pop());
        }
        return this.#rightStack[this.#rightStack.length - 1];
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.#leftStack.length === 0 && this.#rightStack.length === 0;
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
