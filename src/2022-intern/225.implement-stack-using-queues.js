/*
 * @lc app=leetcode id=225 lang=javascript
 *
 * [225] Implement Stack using Queues
 */

// @lc code=start

class MyStack {
  /** @type {number[]} */
  queue;

  /** @type {number[]} */
  tempQueue;

  constructor() {
    this.queue = [];
    this.tempQueue = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.queue.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    while (this.queue.length > 1) {
      this.tempQueue.push(this.queue.shift());
    }

    const top = this.queue.shift();
    [this.queue, this.tempQueue] = [this.tempQueue, this.queue];
    return top;
  }

  /**
   * @return {number}
   */
  top() {
    const top = this.pop();
    this.queue.push(top);
    return top;
  }

  /**
   * @return {boolean}
   */
  empty() {
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
