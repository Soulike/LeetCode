/*
 * @lc app=leetcode id=392 lang=javascript
 *
 * [392] Is Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t)
{
    if (s.length === 0)
    {
        return true;
    }

    const charToIndexesInT = new Map();
    for (let i = 0; i < t.length; i++)
    {
        if (charToIndexesInT.has(t[i]))
        {
            charToIndexesInT.get(t[i]).push(i);
        }
        else
        {
            charToIndexesInT.set(t[i], [i]);
        }
    }

    let lastIndexInT = -1;

    for (const c of s)
    {
        // 使用二分搜索，看看 c 能不能在 t 中找到一个比上一个字母更大的下标
        const indexesInT = charToIndexesInT.get(c);
        if (indexesInT === undefined)
        {
            return false;
        }
        const nextIndex = binarySearchRightBorder(indexesInT, 0, indexesInT.length - 1, lastIndexInT + 1);
        if (nextIndex === -1)
        {
            return false;
        }
        const nextIndexInT = indexesInT[nextIndex];
        lastIndexInT = nextIndexInT;
    }

    return true;
};

function binarySearchRightBorder(nums, left, right, target)
{
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target)
    {
        return mid;
    }
    else if (nums[mid] > target)
    {
        if (mid === 0 || nums[mid - 1] < target)
        {
            return mid;
        }
        else
        {
            return binarySearchRightBorder(nums, left, mid - 1, target);
        }
    }
    else
    {
        if (mid === nums.length - 1)
        {
            return -1;
        }
        else
        {
            return binarySearchRightBorder(nums, mid + 1, right, target);
        }
    }
}
// @lc code=end