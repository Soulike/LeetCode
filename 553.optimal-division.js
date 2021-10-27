/*
 * @lc app=leetcode id=553 lang=javascript
 *
 * [553] Optimal Division
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
const optimalDivision = function (nums)
{
    const {expression} = optimalDivisionHelper(nums, 0, nums.length);
    return expression.length > 2 ? expression.slice(1, -1): expression;
};

/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {{expression: string, value: number}}
 */
function optimalDivisionHelper(nums, left, right)
{
    if (right - left === 1)
    {
        return {expression: `${nums[left]}`, value: nums[left]};
    }
    let leftValue = nums[left] ** 2;
    let leftNumbers = [];
    let maxValue = Number.NEGATIVE_INFINITY;
    let minRightExpression = '';
    let expression = '';
    for (let i = left; i < right - 1; i++)
    {
        leftValue /= nums[i];
        leftNumbers.push(nums[i]);
        const {expression: rightExpression, value: rightValue} = minimalDivisionHelper(nums, i + 1, right);
        if (leftValue / rightValue > maxValue)
        {
            maxValue = leftValue / rightValue;
            minRightExpression = rightExpression;
            if (leftNumbers.length > 1)
            {
                expression = `(${leftNumbers.join('/')}/${minRightExpression})`;
            }
            else
            {
                expression = `(${leftNumbers[0]}/${minRightExpression})`;
            }
        }
    }

    return {value: maxValue, expression};
}

/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {{expression: string, value: number}}
 */
function minimalDivisionHelper(nums, left, right)
{
    if (right - left === 1)
    {
        return {expression: `${nums[left]}`, value: nums[left]};
    }
    let leftValue = nums[left] ** 2;
    let leftNumbers = [];
    let minValue = Number.POSITIVE_INFINITY;
    let maxRightExpression = '';
    let expression = '';
    for (let i = left; i < right - 1; i++)
    {
        leftValue /= nums[i];
        leftNumbers.push(nums[i]);
        const {expression: rightExpression, value: rightValue} = optimalDivisionHelper(nums, i + 1, right);
        if (leftValue / rightValue < minValue)
        {
            minValue = leftValue / rightValue;
            maxRightExpression = rightExpression;
            if (leftNumbers.length > 1)
            {
                expression = `(${leftNumbers.join('/')}/${maxRightExpression})`;
            }
            else
            {
                expression = `(${leftNumbers[0]}/${maxRightExpression})`;
            }
        }
    }
    return {value: minValue, expression};
}
// @lc code=end