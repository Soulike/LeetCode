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
    let maxValueExpression = '';
    for (let i = left; i < right - 1; i++)
    {
        leftValue /= nums[i];
        leftNumbers.push(nums[i]);
        const {expression: rightExpression, value: rightValue} = minimalDivisionHelper(nums, i + 1, right);

        const currentValue = leftValue / rightValue;
        if (currentValue > maxValue)
        {
            maxValue = currentValue;
            if (leftNumbers.length > 1)
            {
                maxValueExpression = `(${leftNumbers.join('/')}/${rightExpression})`;
            }
            else
            {
                maxValueExpression = `(${leftNumbers[0]}/${rightExpression})`;
            }
        }
    }

    return {value: maxValue, expression: maxValueExpression};
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
    let minValueExpression = '';
    for (let i = left; i < right - 1; i++)
    {
        leftValue /= nums[i];
        leftNumbers.push(nums[i]);

        const {expression: rightExpression, value: rightValue} = optimalDivisionHelper(nums, i + 1, right);
        const currentValue = leftValue / rightValue;
        if (currentValue < minValue)
        {
            minValue = currentValue;
            if (leftNumbers.length > 1)
            {
                minValueExpression = `(${leftNumbers.join('/')}/${rightExpression})`;
            }
            else
            {
                minValueExpression = `(${leftNumbers[0]}/${rightExpression})`;
            }
        }
    }
    return {value: minValue, expression: minValueExpression};
}
// @lc code=end