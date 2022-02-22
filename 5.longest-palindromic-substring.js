/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) 
{
    const n = s.length;
    function getLongestPalindrome(centerLeft, centerRight)
    {
        let left = centerLeft;
        let right = centerRight;
        while (left >= 0 && right <= n - 1)
        {
            if (s[left] !== s[right])
            {
                return s.slice(left + 1, right);
            }
            else
            {
                left--;
                right++;
            }
        }

        return s.slice(left + 1, right);
    }

    let maxSubstr = s[0];

    for (let i = 0; i < n - 1; i++)
    {
        const substr1 = getLongestPalindrome(i, i);
        const substr2 = getLongestPalindrome(i, i + 1);

        if (substr1.length > maxSubstr.length)
        {
            maxSubstr = substr1;
        }

        if (substr2.length > maxSubstr.length)
        {
            maxSubstr = substr2;
        }
    }

    return maxSubstr;
};
// @lc code=end