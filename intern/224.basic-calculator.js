/*
 * @lc app=leetcode id=224 lang=javascript
 *
 * [224] Basic Calculator
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    /**
     * 堆栈法
     *
     * 解析到 + 和 -，压栈
     * 解析到一个数字，压栈，如果栈顶是运算符，弹出两个并计算值，压栈
     *
     * 遇到左括号，新建一个栈并计算，直到遇到右括号，栈顶弹出压入之前的栈
     *
     * 在解析数字时遇到 -，就是遇到了第一个负数，那么就压入 0 并倒退
     */

    let currentStack = [];
    const prevStacks = [];
    let isProcessingDigit = true;

    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ' ') {
            if (isProcessingDigit) {
                if (isDigit(s[i])) {
                    const [digit, nextStartIndex] = getNextDigit(s, i);
                    i = nextStartIndex - 1;
                    isProcessingDigit = false;
                    if (currentStack.length === 0) {
                        currentStack.push(digit);
                    } else {
                        const [operator, prevDigit] = [
                            currentStack.pop(),
                            currentStack.pop(),
                        ];
                        if (operator === '+') {
                            currentStack.push(digit + prevDigit);
                        } else {
                            currentStack.push(prevDigit - digit);
                        }
                    }
                } else if (s[i] === '-') {
                    currentStack.push(0);
                    isProcessingDigit = false;
                    i--;
                } else if (s[i] === '(') {
                    prevStacks.push(currentStack);
                    currentStack = [];
                }
            } else {
                if (s[i] !== ')') {
                    currentStack.push(s[i]);
                    isProcessingDigit = true;
                } else {
                    const digit = currentStack[0];
                    currentStack = prevStacks.pop();
                    if (currentStack.length === 0) {
                        currentStack.push(digit);
                    } else {
                        const [operator, prevDigit] = [
                            currentStack.pop(),
                            currentStack.pop(),
                        ];
                        if (operator === '+') {
                            currentStack.push(digit + prevDigit);
                        } else {
                            currentStack.push(prevDigit - digit);
                        }
                    }
                }
            }
        }
    }

    return currentStack[0];
};

function getNextDigit(s, left) {
    let result = 0;
    let nextStartIndex = left + 1;
    for (let i = left; i <= s.length; i++) {
        nextStartIndex = i;
        if (i < s.length && isDigit(s[i])) {
            result *= 10;
            result += Number.parseInt(s[i]);
        } else {
            break;
        }
    }

    return [result, nextStartIndex];
}

function isDigit(c) {
    return (
        c.charCodeAt(0) >= '0'.charCodeAt(0) &&
        c.charCodeAt(0) <= '9'.charCodeAt(0)
    );
}
// @lc code=end
