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
    if (s.length === 0)
    {
        return '';
    }
    else if (s.length === 1)
    {
        return s;
    }
    else if (s.length === 2)
    {
        if (s.charAt(0) === s.charAt(1))
        {
            return s;
        }
        else
        {
            return s.charAt(0);
        }
    }
    // s.length >= 3
    let longestSubstring = '';
    let longestSubstringFromOddCenter = '';
    let longestSubstringFromEvenCenter = '';
    // 奇数串中心字符
    let substringCenter = 1;
    // 偶数串中心字符
    let substringCenterLeft = 0;
    let substringCenterRight = 1;

    while (substringCenter < s.length)
    {
        // 查找奇数对称串
        longestSubstringFromOddCenter = getLongestSubstringFromRange(s, substringCenter - 1, substringCenter + 1);
        // 查找偶数对称串
        longestSubstringFromEvenCenter = getLongestSubstringFromRange(s, substringCenterLeft, substringCenterRight);

        // 找出最大对称串
        if(longestSubstringFromOddCenter.length > longestSubstringFromEvenCenter.length)
        {
            if (longestSubstringFromOddCenter.length > longestSubstring.length)
            {
                longestSubstring = longestSubstringFromOddCenter;
            }
        }
        else
        {
            if (longestSubstringFromEvenCenter.length > longestSubstring.length)
            {
                longestSubstring = longestSubstringFromEvenCenter;
            }
        }

        // 移动中心
        substringCenter++;
        substringCenterLeft = substringCenter - 1;
        substringCenterRight = substringCenterLeft + 1;
    }
    return longestSubstring;
};

/**
 * @description 找到从 left 和 right 开始扩张的最长的对称字符串
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @return {string}
 */
function getLongestSubstringFromRange(s, left, right)
{
    let longestSubstring = '';
    let currentLeft = left;
    let currentRight = right;
    while (currentLeft >= 0 && currentRight < s.length)
    {
        if (s.charAt(currentLeft) === s.charAt(currentRight))
        {
            if (currentLeft === 0 || currentRight === s.length - 1)
            {
                longestSubstring = currentRight - currentLeft + 1 > longestSubstring.length ? s.slice(currentLeft, currentRight + 1) : longestSubstring;
                break;
            }
            else
            {
                currentLeft--;
                currentRight++;
            }
        }
        else
        {
            longestSubstring = currentRight - currentLeft - 1 > longestSubstring.length ? s.slice((currentLeft + 1), currentRight) : longestSubstring;
            break;
        }
    }
    return longestSubstring;
}
// @lc code=end