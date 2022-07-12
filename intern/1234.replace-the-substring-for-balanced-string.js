/*
 * @lc app=leetcode id=1234 lang=javascript
 *
 * [1234] Replace the Substring for Balanced String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * @see https://leetcode.com/problems/replace-the-substring-for-balanced-string/discuss/408978/JavaC%2B%2BPython-Sliding-Window
 */
const balancedString = function (s) {
    const charToCount = {
        Q: 0,
        W: 0,
        E: 0,
        R: 0,
    };

    // 统计整个字符串的字符个数
    for (const char of s) {
        charToCount[char]++;
    }

    const LENGTH = s.length;
    const AVE = LENGTH / 4;

    let left = 0;
    let right = 0;
    let result = Number.POSITIVE_INFINITY;

    /*
    将窗口中的内容删除，如果剩下的字符频率都小于等于 AVE，那么一定能通过填充这个窗口来得到一个平衡的串
    */
    while (right < LENGTH) {
        // 把窗口右侧右移新加入的字符删掉
        charToCount[s.charAt(right)]--;
        /*
        为什么 left < LENGTH？
        1. 当串不是平衡的时候，如果 left===right，没有字符被删除，那么一定不满足小于等于 AVE 的条件，因此 left < right
        2. 当串平衡的时候，如果 left > right，会有多余的字符被添加进来，那么一定不满足小于等于 AVE 的条件，因此 left 不会超过 right+1
        综上 left <= right+1 恒成立，为了防止 left 越界，需要限制
        */
        while (
            left < LENGTH &&
            Math.max(...Object.values(charToCount)) <= AVE
        ) {
            result = Math.min(result, right - left + 1);
            // 把窗口左侧右移新排除的字符加入
            charToCount[s.charAt(left)]++;
            left++;
        }
        right++;
    }

    return result;
};
// @lc code=end

balancedString('QWER');
