/*
 * @lc app=leetcode id=225 lang=javascript
 *
 * [225] Implement Stack using Queues
 */

// @lc code=start

class MyStack {
    /** @type {number[]} */
    #queue1;
    /** @type {number[]} */
    #queue2;

    /** @type {number[]} */
    #currentQueue;

    constructor() {
        this.#queue1 = [];
        this.#queue2 = [];
        this.#currentQueue = this.#queue1;
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        this.#currentQueue.push(x);
    }

    /**
     * @return {number}
     */
    pop() {
        return this.#toggleQueueWithoutLastElement();
    }

    /**
     * @return {number}
     */
    top() {
        const lastElement = this.#toggleQueueWithoutLastElement();
        this.#currentQueue.push(lastElement);
        return lastElement;
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.#currentQueue.length === 0;
    }

    /**
     * @return {number}
     */
    #toggleQueueWithoutLastElement() {
        const anotherQueue =
            this.#currentQueue === this.#queue1 ? this.#queue2 : this.#queue1;
        while (this.#currentQueue.length > 1) {
            anotherQueue.push(this.#currentQueue.shift());
        }
        const lastElement = this.#currentQueue.shift();
        this.#currentQueue = anotherQueue;
        return lastElement;
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
