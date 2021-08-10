/*
 * @lc app=leetcode id=394 lang=javascript
 *
 * [394] Decode String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
const decodeString = function (s)
{
    const stack = ['1', '['];
    const sArr = s.split('');
    sArr.push(']');
    for (let i = 0; i < sArr.length; i++)
    {
        if (sArr[i] === ']')
        {
            const repeatedStr = [];
            let poppedStr = stack.pop();
            while (poppedStr !== '[')
            {
                repeatedStr.push(poppedStr);
                poppedStr = stack.pop();
            }
            repeatedStr.reverse();

            const repeatTimeStrArr = [];

            poppedStr = stack.pop();
            while (isDigit(poppedStr))
            {
                repeatTimeStrArr.push(poppedStr);
                poppedStr = stack.pop();
            }
            stack.push(poppedStr);

            const repeatTime = Number.parseInt(repeatTimeStrArr.reverse().join(''));

            for (let j = 0; j < repeatTime; j++)
            {
                stack.push(...repeatedStr);
            }
        }
        else
        {
            stack.push(sArr[i]);
        }
    }
    return stack.join('');
};

function isDigit(str)
{
    return Number.isInteger(Number.parseInt(str));
}
// @lc code=end

console.log(decodeString("3[a2[c]]"))