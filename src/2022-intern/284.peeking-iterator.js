/*
 * @lc app=leetcode id=284 lang=javascript
 *
 * [284] Peeking Iterator
 */

// @lc code=start
/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function Iterator() {
 *    @return {number}
 *    this.next = function() { // return the next number of the iterator
 *       ...
 *    };
 *
 *    @return {boolean}
 *    this.hasNext = function() { // return true if it still has numbers
 *       ...
 *    };
 * };
 */

class PeekingIterator {
  iterator;
  prevHasNext;
  prevNext;

  /**
   * @param {Iterator} iterator
   */
  constructor(iterator) {
    this.iterator = iterator;
    this.prevHasNext = iterator.hasNext();
    this.prevNext = iterator.next();
  }

  /**
   * @return {number}
   */
  peek() {
    return this.prevNext;
  }

  /**
   * @return {number}
   */
  next() {
    const result = this.prevNext;
    this.prevHasNext = this.iterator.hasNext();
    this.prevNext = this.iterator.next();
    return result;
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return this.prevHasNext;
  }
}

/**
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(arr)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */
// @lc code=end
