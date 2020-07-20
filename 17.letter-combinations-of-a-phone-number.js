/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) 
{
    if (digits.length === 0)
    {
        return [];
    }
    const DIGIT_TO_STRING = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const length = digits.length;
    let prefixStrs = [''];
    let currentDigitIndex = 0;
    for (; currentDigitIndex < length; currentDigitIndex++)
    {
        prefixStrs = combination(prefixStrs, DIGIT_TO_STRING[Number.parseInt(digits.charAt(currentDigitIndex))]);
    }
    return prefixStrs;
};

/**
 * @param {string[]} prefixStrs
 * @param {string} appendStr
 * @return {string[]}
 */
function combination(prefixStrs, appendStr)
{
    const combs = [];
    for (const str of prefixStrs)
    {
        for (const char of appendStr)
        {
            combs.push(str.concat(char));
        }
    }
    return combs;
}
// @lc code=end