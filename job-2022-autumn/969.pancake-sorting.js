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
var pancakeSort = function (arr) {
    /** @type {number[]} */
    const sequence = [];
    /**
     * @param {number} start
     * @param {number} end
     */
    const reverseRange = (start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };

    /**
     * @param {number} end
     */
    const helper = (end) => {
        if (end === 0) {
            return;
        }
        let maxPancake = arr[0];
        let maxPancakeIndex = 0;

        for (let i = 1; i <= end; i++) {
            if (arr[i] > maxPancake) {
                maxPancake = arr[i];
                maxPancakeIndex = i;
            }
        }

        sequence.push(maxPancakeIndex + 1);
        reverseRange(0, maxPancakeIndex);
        sequence.push(end + 1);
        reverseRange(0, end);

        helper(end - 1);
    };

    helper(arr.length - 1);

    return sequence;
};
// @lc code=end
