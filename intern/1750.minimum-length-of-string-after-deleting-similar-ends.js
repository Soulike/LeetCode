/*
 * @lc app=leetcode id=1750 lang=javascript
 *
 * [1750] Minimum Length of String After Deleting Similar Ends
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minimumLength = function (s) {
    if (s.length < 2) {
        return s.length;
    }

    let left = 0;
    let right = s.length - 1;
    let leftLetter = s[left];

    while (true) {
        if (s[left] !== s[right]) {
            return right - left + 1;
        }
        if (left === right) {
            return 1;
        }

        while (s[left] === leftLetter) {
            left++;
            // s[left:right+1] 区间全都是相同的字母，全部被消除
            if (left === right + 1) {
                return 0;
            }
        }

        while (s[right] === leftLetter) {
            right--;
        }

        leftLetter = s[left];
    }
};
// @lc code=end
