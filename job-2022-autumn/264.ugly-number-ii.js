/*
 * @lc app=leetcode id=264 lang=javascript
 *
 * [264] Ugly Number II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    const uglyNumbers = [];

    let list2CurrentIndex = 0;
    let list3CurrentIndex = 0;
    let list5CurrentIndex = 0;

    let list2NextValue = 1;
    let list3NextValue = 1;
    let list5NextValue = 1;

    while (uglyNumbers.length < n) {
        const minValue = Math.min(
            list2NextValue,
            list3NextValue,
            list5NextValue,
        );

        uglyNumbers.push(minValue);

        if (list2NextValue === minValue) {
            list2NextValue = uglyNumbers[list2CurrentIndex] * 2;
            list2CurrentIndex++;
        }
        if (list3NextValue === minValue) {
            list3NextValue = uglyNumbers[list3CurrentIndex] * 3;
            list3CurrentIndex++;
        }
        if (list5NextValue === minValue) {
            list5NextValue = uglyNumbers[list5CurrentIndex] * 5;
            list5CurrentIndex++;
        }
    }

    return uglyNumbers[n - 1];
};
// @lc code=end

nthUglyNumber(1690);
