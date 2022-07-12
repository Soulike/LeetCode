/*
 * @lc app=leetcode id=997 lang=javascript
 *
 * [997] Find the Town Judge
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
const findJudge = function (n, trust) {
    const personToInDegree = new Map();
    const noOutEdgePersons = new Set();
    for (let i = 1; i <= n; i++) {
        personToInDegree.set(i, 0);
        noOutEdgePersons.add(i);
    }
    for (const [a, b] of trust) {
        noOutEdgePersons.delete(a);
        personToInDegree.set(b, personToInDegree.get(b) + 1);
    }

    for (const person of noOutEdgePersons) {
        if (personToInDegree.get(person) === n - 1) {
            return person;
        }
    }
    return -1;
};
// @lc code=end
