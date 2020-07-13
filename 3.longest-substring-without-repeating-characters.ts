/*
 * @lc app=leetcode id=3 lang=typescript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number
{
    if (s.length === 0)
    {
        return 0;
    }
    else if (s.length === 1)
    {
        return 1;
    }
    // s.length >= 2
    const chars: Map<string, number> = new Map();    // {char: index}
    let left = 0;
    let right = 1;
    let index: undefined | number = undefined;
    let longestLength = 0;   // 目前为止的最大长度
    let currentLength = 0;  // 某次不重复串的长度
    chars.set(s[0], 0);
    while (right <= s.length)
    {
        if (right === s.length) // 记录最后一个串
        {
            currentLength = right - left;
            longestLength = Math.max(currentLength, longestLength);
            break;
        }

        index = chars.get(s[right]);
        if (index !== undefined && index >= left)    // 字母在当前范围内遇到过，记录长度，left 移动到被重复字母位置之后
        {
            currentLength = right - left;
            longestLength = Math.max(currentLength, longestLength);

            left = index + 1;
        }

        // 继续向右看
        chars.set(s[right], right);
        right++;
    }
    return longestLength;
};
// @lc code=end

