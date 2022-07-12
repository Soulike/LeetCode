/*
 * @lc app=leetcode id=29 lang=javascript
 *
 * [29] Divide Two Integers
 */

// @lc code=start
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    const MIN = -(2 ** 31);
    const MAX = 2 ** 31 - 1;

    // 防止被除数是 MIN 导致 abs 时溢出
    if (dividend === MIN) {
        if (divisor > 0) {
            return Math.max(divide(dividend + divisor, divisor) - 1, MIN);
        } else {
            return Math.min(divide(dividend - divisor, divisor) + 1, MAX);
        }
    }

    let isNegative = false;

    if ((dividend < 0 || divisor < 0) && !(dividend < 0 && divisor < 0)) {
        isNegative = true;
    }

    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    let quotient = 0;

    while (dividend >= divisor) {
        let currentDivisor = divisor;
        let currentDivisorMultiplyCount = 1;

        // 从 divisor 开始，2 倍递增消耗 dividend
        // 每次不能再递增时，退回 divisor 再次开始消耗
        while (dividend >= currentDivisor) {
            dividend -= currentDivisor;
            quotient += currentDivisorMultiplyCount;

            currentDivisorMultiplyCount =
                currentDivisorMultiplyCount + currentDivisorMultiplyCount;

            currentDivisor = currentDivisor + currentDivisor;
        }
    }

    const result = isNegative ? -quotient : quotient;
    return Math.min(Math.max(result, MIN), MAX);
};
// @lc code=end
