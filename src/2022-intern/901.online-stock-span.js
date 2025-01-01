/*
 * @lc app=leetcode id=901 lang=javascript
 *
 * [901] Online Stock Span
 */

// @lc code=start
class StockSpanner {
  /**@type {number[]} */
  prices = [];
  /**@type {number[]} */
  spans = [];

  /**
   * @param {number} price
   * @return {number}
   */
  next(price) {
    const LENGTH = this.prices.length;
    // 没有价格，或者前一天价格比今天价格高，直接是 1
    if (LENGTH === 0 || this.prices[LENGTH - 1] > price) {
      this.prices.push(price);
      this.spans.push(1);
    } // 前一天价格低
    else {
      let index = LENGTH - 1;
      // 根据 span 跳着寻找比当前价格大的价格在哪天
      while (index >= 0) {
        if (this.prices[index] <= price) {
          index -= this.spans[index];
        } else {
          break;
        }
      }
      this.prices.push(price);
      // 这里的 LENGTH 是 price 所处的下标，index 是比 price 大的价格的下标，相减得到算自己在内的价格的个数
      this.spans.push(LENGTH - index);
    }
    return this.spans[LENGTH];
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
// @lc code=end
