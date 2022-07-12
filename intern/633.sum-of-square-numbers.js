/*
 * @lc app=leetcode id=633 lang=javascript
 *
 * [633] Sum of Square Numbers
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
    let a = 0;
    let b = Math.floor(Math.sqrt(c));

    let aSquare = a * a;
    let bSquare = b * b;

    while (a <= b) {
        const squareSum = aSquare + bSquare;
        if (squareSum < c) {
            a++;
            aSquare = a * a;
        } else if (squareSum > c) {
            b--;
            bSquare = b * b;
        } else {
            return true;
        }
    }

    return false;
};
// @lc code=end

console.log(judgeSquareSum(0));
