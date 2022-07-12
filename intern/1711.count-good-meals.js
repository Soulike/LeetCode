/*
 * @lc app=leetcode id=1711 lang=javascript
 *
 * [1711] Count Good Meals
 */

// @lc code=start
/**
 * @param {number[]} deliciousness
 * @return {number}
 */
const countPairs = function (deliciousness) {
    /**@type {Array<number>} */
    const powers = [];
    let power = 1;
    for (let i = 0; i <= 20; i++) {
        powers.push(power);
        power *= 2;
    }

    /**@type {Map<number, number>} */
    const deliciousValueToTime = new Map();
    for (const deliciousValue of deliciousness) {
        deliciousValueToTime.set(
            deliciousValue,
            (deliciousValueToTime.get(deliciousValue) ?? 0) + 1,
        );
    }

    let result = 0;
    const MOD = 10 ** 9 + 7;

    for (const [deliciousValue, time] of deliciousValueToTime) {
        for (const power of powers) {
            const left = power - deliciousValue;
            if (left > deliciousValue) {
                if (deliciousValueToTime.has(left)) {
                    result =
                        (result + deliciousValueToTime.get(left) * time) % MOD;
                }
            } else if (left === 0 && time >= 2) {
                result = (result + comb(time, 2)) % MOD;
            } else {
                continue;
            }
        }
    }

    return result;
};

/**
 *
 * @param {number} m
 * @param {number} n
 */
function comb(m, n) {
    let result = 1;
    for (let i = 1; i <= m - n; i++) {
        result /= i;
        result *= i + n;
    }
    return result;
}

// @lc code=end
