/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
class DequeueNode {
  value;
  prev;
  next;

  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Dequeue {
  fakeHead;
  fakeTail;

  constructor() {
    this.fakeHead = new DequeueNode(-1);
    this.fakeTail = new DequeueNode(-1);

    this.fakeHead.next = this.fakeTail;
    this.fakeTail.prev = this.fakeHead;
  }

  isEmpty() {
    return this.fakeHead.next === this.fakeTail;
  }

  pushHead(val) {
    const newNode = new DequeueNode(val);

    const prevNode = this.fakeHead;
    const nextNode = this.fakeHead.next;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;
  }

  pushTail(val) {
    const newNode = new DequeueNode(val);

    const prevNode = this.fakeTail.prev;
    const nextNode = this.fakeTail;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;
  }

  popHead() {
    const poppedNode = this.fakeHead.next;
    const nextNode = poppedNode.next;
    if (poppedNode !== this.fakeTail) {
      this.fakeHead.next = nextNode;
      nextNode.prev = this.fakeHead;
    } else {
      throw new Error('Dequeue is empty');
    }
  }

  popTail() {
    const poppedNode = this.fakeTail.prev;
    const prevNode = poppedNode.prev;
    if (poppedNode !== this.fakeHead) {
      this.fakeTail.prev = prevNode;
      prevNode.next = this.fakeTail;
    } else {
      throw new Error('Dequeue is empty');
    }
  }

  getHead() {
    const headNode = this.fakeHead.next;
    if (headNode !== this.fakeTail) {
      return headNode.value;
    } else {
      throw new Error('Dequeue is empty');
    }
  }

  getTail() {
    const tailNode = this.fakeTail.prev;
    if (tailNode !== this.fakeHead) {
      return tailNode.value;
    } else {
      throw new Error('Dequeue is empty');
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (nums.length === k) {
    return [Math.max(...nums)];
  }

  // 至少有两个窗口

  let result = [];
  // 从队首到队尾，不严格递减
  const monodequeue = new Dequeue();

  let windowStart = 0;
  let windowEnd = k - 1;
  for (let i = windowStart; i <= windowEnd; i++) {
    while (!monodequeue.isEmpty() && monodequeue.getTail() < nums[i]) {
      monodequeue.popTail();
    }
    monodequeue.pushTail(nums[i]);
  }

  result.push(monodequeue.getHead());
  windowStart++;
  windowEnd++;

  while (windowEnd < nums.length) {
    if (nums[windowStart - 1] === monodequeue.getHead()) {
      monodequeue.popHead();
    }
    while (!monodequeue.isEmpty() && monodequeue.getTail() < nums[windowEnd]) {
      monodequeue.popTail();
    }
    monodequeue.pushTail(nums[windowEnd]);
    result.push(monodequeue.getHead());
    windowStart++;
    windowEnd++;
  }

  return result;
};
// @lc code=end

maxSlidingWindow([1, 2, 3, 4, 5], 1);
