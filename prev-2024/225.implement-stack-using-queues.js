/*
 * @lc app=leetcode id=225 lang=javascript
 *
 * [225] Implement Stack using Queues
 */

// @lc code=start

class MyStack {
  /** @type {number[]} */
  #queue;

  constructor() {
    this.#queue = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.#queue.push(x);
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
    this.#queue.push(lastElement);
    return lastElement;
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.#queue.length === 0;
  }

  /**
   * @return {number}
   */
  #toggleQueueWithoutLastElement() {
    const currentQueueLength = this.#queue.length;
    for (let i = 0; i < currentQueueLength - 1; i++) {
      this.#queue.push(this.#queue.shift());
    }
    const lastElement = this.#queue.shift();
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
