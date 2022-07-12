/*
 * @lc app=leetcode id=331 lang=javascript
 *
 * [331] Verify Preorder Serialization of a Binary Tree
 */

// @lc code=start
/**
 * @param {string} preOrderString
 * @return {boolean}
 */
const isValidSerialization = function (preOrderString) {
    let preOrder = preOrderString.split(',');

    let outDegree = 1; // 可用的出度
    for (let i = 0; i < preOrder.length; i++) {
        if (outDegree === 0) {
            // 没有可用出度，但还有结点
            return false;
        }
        outDegree--; // 挂上结点，消耗一个出度
        if (preOrder[i] !== '#') {
            outDegree += 2; // 非 null 结点可以提供两个出度
        }
    }
    return outDegree === 0; // 没有多余的出度
};
// @lc code=end
