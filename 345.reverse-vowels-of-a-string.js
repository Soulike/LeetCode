/*
 * @lc app=leetcode id=345 lang=javascript
 *
 * [345] Reverse Vowels of a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s)
{
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

    const sArr = [...s];
    let left = 0;
    let right = s.length - 1;

    while (left < right)
    {
        while (!vowels.has(s[left]) && left < right)
        {
            left++;
        }
        while (!vowels.has(s[right]) && left < right)
        {
            right--;
        }
        [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
        left++;
        right--;
    }

    return sArr.join('');
};
// @lc code=end