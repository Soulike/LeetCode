/*
 * @lc app=leetcode id=91 lang=javascript
 *
 * [91] Decode Ways
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = function (s) {
    if (s[0] === '0') {
        return 0;
    }
    if (s.length === 1) {
        return 1;
    }
    // 斐波那契数列，预先处理前两位
    const ways = [1]; // 到第 i 位为止，有多少种解码方法
    const num = Number.parseInt(s.slice(0, 2));
    if (num % 10 === 0) {
        // 第二位是 0，当成一个数字对待
        if (num <= 20) {
            // 如果是 10 或者 20
            ways[1] = 1;
        } // 大于 20，不可能被成功解析
        else {
            return 0;
        }
    } else if (num <= 26) {
        ways[1] = 2;
    } else {
        ways[1] = 1;
    }
    for (let i = 2; i < s.length; i++) {
        const num = Number.parseInt(s.slice(i - 1, i + 1));
        if (num === 0) {
            // 两位连续的 0，不可能成功解析
            return 0;
        }

        if (s[i - 1] === '0') {
            ways[i] = ways[i - 1];
        } else if (num % 10 === 0) {
            if (num <= 20) {
                // 发现是 10 或者 20，要作为整体，修正
                ways[i - 1] = ways[i - 2];
                ways[i] = ways[i - 1];
            } // 大于 20，不可能被成功解析
            else {
                return 0;
            }
        } else if (num <= 26) {
            // 斐波那契数列
            // 自己单独一位解码 + 和前一位组合解码
            ways[i] = ways[i - 1] + ways[i - 2];
        } else {
            // 自己单独一位解码
            ways[i] = ways[i - 1];
        }
    }
    return ways[ways.length - 1];
};
// @lc code=end

console.log(numDecodings('230'));
