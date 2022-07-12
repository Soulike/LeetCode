/*
 * @lc app=leetcode id=316 lang=javascript
 *
 * [316] Remove Duplicate Letters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    // 从栈底到栈顶递增
    const monostack = [];

    // letter 还剩下多少个可用？
    const letterToLeftCount = new Map();
    for (const letter of s) {
        letterToLeftCount.set(letter, (letterToLeftCount.get(letter) ?? 0) + 1);
    }

    const inStackLetters = new Set();

    for (const letter of s) {
        if (!inStackLetters.has(letter)) {
            if (monostack.length !== 0) {
                let topLetter = monostack[monostack.length - 1];
                // 栈顶比 letter 大，而且栈顶字母后面还有，就弹出
                while (
                    topLetter.charCodeAt(0) >= letter.charCodeAt(0) &&
                    letterToLeftCount.get(topLetter) > 0
                ) {
                    monostack.pop();
                    inStackLetters.delete(topLetter);
                    if (monostack.length === 0) {
                        break;
                    }
                    topLetter = monostack[monostack.length - 1];
                }
            }
            monostack.push(letter);
            inStackLetters.add(letter);
        }
        letterToLeftCount.set(letter, letterToLeftCount.get(letter) - 1);
    }

    return monostack.join('');
};
// @lc code=end
