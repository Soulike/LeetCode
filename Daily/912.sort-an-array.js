/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    quickSort(nums);
    return nums;
};

/**
 * @param {number[]} nums
 * @returns {void}
 */
function quickSort(nums) {
    /**
     * @param {number} leftBorder
     * @param {number} rightBorder
     * @returns {void}
     */
    const recursive = (leftBorder, rightBorder) => {
        if (leftBorder >= rightBorder) return;
        const randomIndex = random(leftBorder, rightBorder);
        [nums[leftBorder], nums[randomIndex]] = [
            nums[randomIndex],
            nums[leftBorder],
        ];

        let pivot = nums[leftBorder];
        let left = leftBorder;
        let right = rightBorder;

        while (left < right) {
            while (left < right && nums[right] >= pivot) {
                right--;
            }
            while (left < right && nums[left] <= pivot) {
                left++;
            }

            [nums[left], nums[right]] = [nums[right], nums[left]];
        }

        [nums[leftBorder], nums[right]] = [nums[right], nums[leftBorder]];

        recursive(leftBorder, right - 1);
        recursive(right + 1, rightBorder);
    };

    recursive(0, nums.length - 1);
}

/**
 * @param {number} start
 * @param {number} end
 * @returns {number}
 */
function random(start, end) {
    return start + Math.round(Math.random() * (end - start));
}
// @lc code=end

sortArray([5, 2, 3, 1]);
