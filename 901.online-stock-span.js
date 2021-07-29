/*
 * @lc app=leetcode id=901 lang=javascript
 *
 * [901] Online Stock Span
 */

// @lc code=start
class StockSpanner
{
    /**@type number[] */
    priceQuotes = [];

    /**
    * @param {number} price
    * @return {number}
    */
    next(price)
    {
        this.priceQuotes.push(price);
        const LENGTH = this.priceQuotes.length;
        let counter = 0;
        for (let i = LENGTH - 1; i >= 0; i--)
        {
            if (this.priceQuotes[i] <= price)
            {
                counter++;
            }
            else
            {
                break;
            }
        }
        return counter;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
// @lc code=end

