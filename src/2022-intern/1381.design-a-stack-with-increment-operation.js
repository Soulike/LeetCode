/*
 * @lc app=leetcode id=1381 lang=javascript
 *
 * [1381] Design a Stack With Increment Operation
 */

// @lc code=start
/**
 * @param {number} maxSize
 */
class CustomStack {
  stack;
  top;
  increments; // 当前这个位置，应该相加多少？

  constructor(maxSize) {
    this.stack = new Array(maxSize);
    this.top = 0;
    this.increments = new Array(maxSize);
    this.increments.fill(0);
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.top < this.stack.length) {
      this.stack[this.top] = x;
      this.top++;
    }
  }

  /**
   * @return {number}
   */
  pop() {
    if (this.top === 0) {
      return -1;
    }
    this.top--;
    const result = this.stack[this.top] + this.increments[this.top];

    if (this.top !== 0) {
      // 发生 pop，向下传递
      this.increments[this.top - 1] += this.increments[this.top];
    }
    this.increments[this.top] = 0;

    return result;
  }

  /**
   * @param {number} k
   * @param {number} val
   * @return {void}
   */
  increment(k, val) {
    // 注意需要确认栈顶和 k-1 谁更小
    this.increments[Math.min(k - 1, this.top - 1)] += val;
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
