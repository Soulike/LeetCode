/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) 
{
    let left = 0;
    let right = height.length - 1;
    let leftHeight = height[left];
    let rightHeight = height[right];

    let maxVolume = 0;
    while (left < right)
    {
        if (leftHeight > rightHeight)
        {
            maxVolume = Math.max(maxVolume, (right - left) * rightHeight);
            right--;
            rightHeight = height[right];
        }
        else    // leftHeight <= rightHeight
        {
            maxVolume = Math.max(maxVolume, (right - left) * leftHeight);
            left++;
            leftHeight = height[left];
        }
    }
    return maxVolume;
};
// @lc code=end

