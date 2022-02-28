/*
 * @lc app=leetcode id=969 lang=javascript
 *
 * [969] Pancake Sorting
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (arr)
{
    if (arr.length < 2)
    {
        return [];
    }

    function reverse(left, right)
    {
        while (left < right)
        {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    let result = [];

    function helper(arr, right)
    {
        /**
         * 在剩余的 arr 里面找 i，使得 arr[i] = right+1（即最大值）
         * 然后翻转 [0,i] [0,right] 使得 right+1 到最后面
         * 递归 helper(arr,n-1)
         */

        if (right === 0)
        {
            return;
        }

        for (let i = 0; i <= right; i++)
        {
            if (arr[i] === right + 1)
            {
                reverse(0, i);
                if (i + 1 > 1)
                {
                    result.push(i + 1);
                }
                reverse(0, right);
                if (right + 1 > 1)
                {
                    result.push(right + 1);
                }
                helper(arr, right - 1);
                break;
            }
        }
    }

    helper(arr, arr.length - 1);
    return result;
};
// @lc code=end

pancakeSort([1, 3, 2])