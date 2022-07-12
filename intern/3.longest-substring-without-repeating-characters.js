/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
    const letterToAmount = new Map();

    let maxLength = 0;
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const rightLetter = s[right];
        const rightLetterAmount = letterToAmount.get(rightLetter);
        if (rightLetterAmount !== undefined && rightLetterAmount > 0) {
            // 遇到重复，计算窗口大小
            maxLength = Math.max(maxLength, right - left);

            const leftLetter = s[left];
            const leftLetterAmount = letterToAmount.get(leftLetter);
            letterToAmount.set(leftLetter, leftLetterAmount - 1);
            left++;
            right--;
        } else {
            letterToAmount.set(rightLetter, 1);
        }
    }

    // 最后一个无重复子串可能没被计算
    maxLength = Math.max(maxLength, s.length - left);

    return maxLength;
};
// @lc code=end
