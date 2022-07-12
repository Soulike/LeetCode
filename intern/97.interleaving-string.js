/*
 * @lc app=leetcode id=97 lang=javascript
 *
 * [97] Interleaving String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = function (s1, s2, s3) {
    const cache = new Map();
    return helper(s1, 0, s2, 0, s3, 0, cache);
};

/**
 * @param {string} s1
 * @param {number} s1Start
 * @param {string} s2
 * @param {number} s2Start
 * @param {string} s3
 * @param {number} s3Start
 * @param {Map<string, boolean>} cache
 * @return {boolean}
 */
function helper(s1, s1Start, s2, s2Start, s3, s3Start, cache) {
    const cached = cache.get(`${s1Start}-${s2Start}-${s3Start}`);
    if (cached !== undefined) {
        return cached;
    }

    if (s1.length - s1Start + (s2.length - s2Start) !== s3.length - s3Start) {
        cache.set(`${s1Start}-${s2Start}-${s3Start}`, false);
        return false;
    }

    if (s1.length - s1Start === 0) {
        const result = s2.slice(s2Start) === s3.slice(s3Start);
        cache.set(`${s1Start}-${s2Start}-${s3Start}`, result);
        return result;
    }
    if (s2.length - s2Start === 0) {
        const result = s1.slice(s1Start) === s3.slice(s3Start);
        cache.set(`${s1Start}-${s2Start}-${s3Start}`, result);
        return result;
    }
    let found = false;
    for (let i = s3Start + 1; i <= s3.length; i++) {
        const prefix = s3.slice(s3Start, i);
        if (s1.startsWith(prefix, s1Start)) {
            found =
                found ||
                helper(
                    s1,
                    s1Start + (i - s3Start),
                    s2,
                    s2Start,
                    s3,
                    s3Start + (i - s3Start),
                    cache,
                );
        }
        if (s2.startsWith(prefix, s2Start)) {
            found =
                found ||
                helper(
                    s1,
                    s1Start,
                    s2,
                    s2Start + (i - s3Start),
                    s3,
                    s3Start + (i - s3Start),
                    cache,
                );
        }
        if (found) {
            cache.set(`${s1Start}-${s2Start}-${s3Start}`, true);
            return true;
        }
    }
    cache.set(`${s1Start}-${s2Start}-${s3Start}`, false);
    return false;
}
// @lc code=end

console.log(
    isInterleave(
        'bcbccabcccbcbbbcbbacaaccccacbaccabaccbabccbabcaabbbccbbbaa',
        'ccbccaaccabacaabccaaccbabcbbaacacaccaacbacbbccccbac',
        'bccbcccabbccaccaccacbacbacbabbcbccbaaccbbaacbcbaacbacbaccaaccabcaccacaacbacbacccbbabcccccbababcaabcbbcccbbbaa',
    ),
); // false

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));

console.log(isInterleave('a', '', 'a'));
