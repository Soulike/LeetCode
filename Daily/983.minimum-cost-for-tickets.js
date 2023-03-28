/*
 * @lc app=leetcode id=983 lang=javascript
 *
 * [983] Minimum Cost For Tickets
 */

// @lc code=start
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
    /**
     * dp[i] the min cost of day i
     *
     * if i is not in days
     *  wont travel
     *  travel from day j to day i where j < i
     *  buy one day ticket
     *
     * if i is in days
     *  travel from day j to day i where j < i
     *  buy one day ticket
     */

    const maxDay = days[days.length - 1];
    const keyDays = new Set(days);

    /** @type {number[]} */
    const dp = [];

    dp[0] = 0;

    for (let i = 1; i <= maxDay; i++) {
        let minCost = Infinity;
        if (!keyDays.has(i)) {
            minCost = dp[i - 1]; // wont travel
        }

        // travel from day j
        for (let j = i - 1; j >= 1; j--) {
            const daysCovered = i - j + 1;
            if (daysCovered > 30) break;
            minCost = Math.min(
                minCost,
                dp[j - 1] +
                    (daysCovered <= 1
                        ? costs[0]
                        : daysCovered <= 7
                        ? costs[1]
                        : costs[2]),
            );
        }

        minCost = Math.min(minCost, dp[i - 1] + costs[0]);

        dp[i] = minCost;
    }

    return dp[maxDay];
};
// @lc code=end
