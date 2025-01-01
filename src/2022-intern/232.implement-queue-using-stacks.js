/*
 * @lc app=leetcode id=232 lang=javascript
 *
 * [232] Implement Queue using Stacks
 */

// @lc code=start

class MyQueue {
  headToTailStack; // 栈顶是 tail，栈底是 head
  tailToHeadStack; // 栈底是 tail，栈顶是 head

  constructor() {
    this.headToTailStack = [];
    this.tailToHeadStack = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.headToTailStack.length === 0) {
      this.transferStack();
    }
    this.headToTailStack.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    if (this.tailToHeadStack.length === 0) {
      this.transferStack();
    }
    return this.tailToHeadStack.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (this.tailToHeadStack.length === 0) {
      this.transferStack();
    }
    return this.tailToHeadStack[this.tailToHeadStack.length - 1];
  }

  /**
   * @return {boolean}
   */
  empty() {
    return (
      this.headToTailStack.length === 0 && this.tailToHeadStack.length === 0
    );
  }

  transferStack() {
    if (this.headToTailStack.length === 0) {
      while (this.tailToHeadStack.length > 0) {
        this.headToTailStack.push(this.tailToHeadStack.pop());
      }
    } else if (this.tailToHeadStack.length === 0) {
      while (this.headToTailStack.length > 0) {
        this.tailToHeadStack.push(this.headToTailStack.pop());
      }
    }
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
