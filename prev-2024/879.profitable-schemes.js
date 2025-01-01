/*
 * @lc app=leetcode id=879 lang=javascript
 *
 * [879] Profitable Schemes
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
var profitableSchemes = function (n, minProfit, group, profit) {
  const MOD = 10 ** 9 + 7;
  const GROUP_NUM = group.length;

  /** @type {Map<string, number>} */
  const memo = new Map();

  /**
   * @param {number} n
   * @param {number} minProfit
   * @param {number} startIndex
   * @returns {number}
   */
  const recursive = (n, minProfit, startIndex) => {
    if (startIndex === GROUP_NUM) return 0;

    const memoKey = `${n}-${minProfit}-${startIndex}`;
    if (memo.has(memoKey)) return memo.get(memoKey);

    let count = 0;
    count += recursive(n, minProfit, startIndex + 1);

    if (n >= group[startIndex]) {
      if (profit[startIndex] >= minProfit) count++;

      count += recursive(
        n - group[startIndex],
        Math.max(minProfit - profit[startIndex], 0),
        startIndex + 1,
      );
    }

    const mod = count % MOD;
    memo.set(memoKey, mod);
    return mod;
  };

  let result = recursive(n, minProfit, 0);
  if (minProfit === 0) result++;

  return result;
};
// @lc code=end

profitableSchemes(64, 0, [80, 40], [88, 88]);
