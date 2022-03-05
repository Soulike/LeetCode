/*
 * @lc app=leetcode id=1262 lang=javascript
 *
 * [1262] Greatest Sum Divisible by Three
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums)
{
    /**
     * 求和
     * 如果是 3 的倍数，返回
     * 如果余数为 1，删掉最小的一个余数为 1 的数字，或删掉两个余数为 2 的数字
     * 如果余数为 2，删掉最小的一个余数为 2 的数字，或者删掉两个余数为 1 的数字
     */

    const sum = nums.reduce((prev, curr) => prev + curr);

    if (sum % 3 === 0)
    {
        return sum;
    }
    else
    {
        nums.sort((a, b) => a - b);
        if (sum % 3 === 1)
        {
            let numWithRemainder1 = 0;
            let num1WithRemainder2 = 0;
            let num2WithRemainder2 = 0;

            for (const num of nums)
            {
                if (numWithRemainder1 !== 0
                    && num1WithRemainder2 !== 0
                    && num2WithRemainder2 !== 0)
                {
                    break;
                }
                if (num % 3 === 1 && numWithRemainder1 === 0)
                {
                    numWithRemainder1 = num;
                }
                else if (num % 3 === 2)
                {
                    if (num1WithRemainder2 === 0)
                    {
                        num1WithRemainder2 = num;
                    }
                    else if (num2WithRemainder2 === 0)
                    {
                        num2WithRemainder2 = num;
                    }
                }
            }

            if (num2WithRemainder2 === 0)
            {
                return sum - numWithRemainder1;
            }
            else
            {
                return sum - (numWithRemainder1 < num1WithRemainder2 + num2WithRemainder2
                    ? numWithRemainder1
                    : num1WithRemainder2 + num2WithRemainder2);
            }
        }
        else if (sum % 3 === 2)
        {
            let numWithRemainder2 = 0;
            let num1WithRemainder1 = 0;
            let num2WithRemainder1 = 0;

            for (const num of nums)
            {
                if (numWithRemainder2 !== 0
                    && num1WithRemainder1 !== 0
                    && num2WithRemainder1 !== 0)
                {
                    break;
                }
                if (num % 3 === 2 && numWithRemainder2 === 0)
                {
                    numWithRemainder2 = num;
                }
                else if (num % 3 === 1)
                {
                    if (num1WithRemainder1 === 0)
                    {
                        num1WithRemainder1 = num;
                    }
                    else if (num2WithRemainder1 === 0)
                    {
                        num2WithRemainder1 = num;
                    }
                }
            }

            if (num2WithRemainder1 === 0)
            {
                return sum - numWithRemainder2;
            }
            else
            {
                return sum - (numWithRemainder2 < num1WithRemainder1 + num2WithRemainder1
                    ? numWithRemainder2
                    : num1WithRemainder1 + num2WithRemainder1);
            }
        }
    }
};
// @lc code=end