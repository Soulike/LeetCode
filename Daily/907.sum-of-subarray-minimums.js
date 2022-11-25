/*
 * @lc app=leetcode id=907 lang=javascript
 *
 * [907] Sum of Subarray Minimums
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
    const MOD = 10 ** 9 + 7;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // prevent calculating duplicate ranges on duplicate numbers
        let leftBorder = i - 1;
        while (leftBorder >= 0 && arr[leftBorder] > arr[i]) {
            leftBorder--;
        }
        leftBorder++;

        let rightBorder = i;
        while (rightBorder <= arr.length - 1 && arr[rightBorder] >= arr[i]) {
            rightBorder++;
        }
        rightBorder--;

        const leftIndexCount = i - leftBorder;
        const rightIndexCount = rightBorder - i;
        sum += ((leftIndexCount + 1) * (rightIndexCount + 1) * arr[i]) % MOD;
        sum %= MOD;
    }

    return sum;
};
// @lc code=end

sumSubarrayMins([1, 6, 8, 7, 4, 5, 9, 6, 5, 4, 7, 8, 5]);
