/*
 * @lc app=leetcode id=640 lang=javascript
 *
 * [640] Solve the Equation
 */

// @lc code=start
/**
 * @param {string} equation
 * @return {string}
 */
const solveEquation = function (equation)
{
    const [left, right] = equation.split('=');
    const parsedLeft = parse(left);
    const parsedRight = parse(right);

    if (parsedLeft.coefficient === parsedRight.coefficient)
    {
        if (parsedLeft.number === parsedRight.number)
        {
            return 'Infinite solutions';
        }
        else
        {
            return 'No solution';
        }
    }
    else
    {
        parsedLeft.coefficient -= parsedRight.coefficient;
        parsedRight.number -= parsedLeft.number;
        const answer = parsedRight.number / parsedLeft.coefficient;

        return `x=${answer}`;
    }
};

/**
 * 
 * @param {string} partialEquation 
 * @returns {{coefficient: number, number: number}} - x 的系数以及剩余数字
 */
function parse(partialEquation)
{
    let coefficient = 0;
    let number = 0;
    let currentNumber = 0;
    /**
     * @type {'+'|'-'}
     */
    let lastOperator = '+';
    for (let i = 0; i < partialEquation.length; i++)
    {
        const char = partialEquation[i];
        if (char === '+' || char === '-')
        {
            number += (lastOperator === '+'
                ? currentNumber
                : -currentNumber);
            lastOperator = char;
            currentNumber = 0;
        }
        else if (char === 'x')
        {
            if (i === 0 || !isNumberChar(partialEquation[i - 1]))
            {
                currentNumber = 1;
            }
            coefficient += (lastOperator === '+'
                ? currentNumber
                : -currentNumber);
            currentNumber = 0;
        }
        else    // number
        {
            currentNumber = currentNumber * 10 + Number.parseInt(char);
        }
    }
    number += (lastOperator === '+'
        ? currentNumber
        : -currentNumber);
    return {
        coefficient, number
    };
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isNumberChar(char)
{
    return Number.isInteger(Number.parseInt(char));
}
// @lc code=end