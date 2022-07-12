/*
 * @lc app=leetcode id=67 lang=javascript
 *
 * [67] Add Binary
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
    const LENGTH = Math.max(a.length, b.length);
    const ZERO_ASCII = '0'.charCodeAt(0);
    a = a.padStart(LENGTH, '0');
    b = b.padStart(LENGTH, '0');
    const result = [];
    let carry = 0;
    for (let i = LENGTH - 1; i >= 0; i--) {
        const aBit = a.charCodeAt(i) - ZERO_ASCII;
        const bBit = b.charCodeAt(i) - ZERO_ASCII;

        switch (aBit + bBit + carry) {
            case 3: {
                result.push('1');
                carry = 1;
                break;
            }
            case 2: {
                result.push('0');
                carry = 1;
                break;
            }
            case 1: {
                result.push('1');
                carry = 0;
                break;
            }
            case 0: {
                result.push('0');
                carry = 0;
                break;
            }
        }
    }

    if (carry === 1) {
        result.push('1');
    }

    result.reverse();
    return result.join('');
};
// @lc code=end
