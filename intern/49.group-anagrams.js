/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    /**@type {Map<string, string[]>} */
    const sortedStrToStrs = new Map();
    let sortedStr = '';
    /**@type {string[] | undefined} */
    let sortedStrs = undefined;
    for (const str of strs) {
        sortedStr = strSort(str);
        sortedStrs = sortedStrToStrs.get(sortedStr);
        if (sortedStrs === undefined) {
            sortedStrToStrs.set(sortedStr, [str]);
        } else {
            sortedStrs.push(str);
        }
    }

    return Array.from(sortedStrToStrs.values());
};

/**
 * @param {string} str
 * @return {string}
 */
function strSort(str) {
    return str.split('').sort().join('');
}
// @lc code=end
