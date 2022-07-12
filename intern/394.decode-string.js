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
const decodeString = function (s) {
    const repeatTimeStack = [];
    const strStack = [];
    const sArr = ['1', '[', ...s.split(''), ']'];
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] === ']') {
            const repeatedStr = [];
            let poppedStr = strStack.pop();
            while (poppedStr !== '[') {
                repeatedStr.push(poppedStr);
                poppedStr = strStack.pop();
            }
            repeatedStr.reverse();

            const repeatTime = repeatTimeStack.pop();

            for (let j = 0; j < repeatTime; j++) {
                strStack.push(...repeatedStr);
            }
        } else if (isDigit(sArr[i])) {
            if (i === 0 || !isDigit(sArr[i - 1])) {
                repeatTimeStack.push(0);
            }
            repeatTimeStack[repeatTimeStack.length - 1] =
                repeatTimeStack[repeatTimeStack.length - 1] * 10 +
                Number.parseInt(sArr[i]);
        } else {
            strStack.push(sArr[i]);
        }
    }
    return strStack.join('');
};

function isDigit(str) {
    return !Number.isNaN(Number.parseInt(str));
}
// @lc code=end
