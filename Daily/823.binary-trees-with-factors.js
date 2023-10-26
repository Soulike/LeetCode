/*
 * @lc app=leetcode id=823 lang=javascript
 *
 * [823] Binary Trees With Factors
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
    const MOD = 10 ** 9 + 7;
    const nums = new Set(arr);

    /** @type {Map<number, number>} */
    const memo = new Map();
    /**
     * @param {number} rootNum
     * @returns {number}
     */
    const getBinaryTreeVariantNumber = (rootNum) => {
        if (memo.has(rootNum)) return memo.get(rootNum);
        let treeNumber = 1; // initialized to 1 as a tree with no leaf

        for (const leftChildRootNum of nums) {
            if (
                leftChildRootNum < rootNum &&
                rootNum % leftChildRootNum === 0
            ) {
                const rightChildRootNum = rootNum / leftChildRootNum;
                if (nums.has(rightChildRootNum)) {
                    const leftChildVariantNumber =
                        getBinaryTreeVariantNumber(leftChildRootNum);
                    const rightChildVariantNumber =
                        getBinaryTreeVariantNumber(rightChildRootNum);

                    treeNumber +=
                        leftChildVariantNumber * rightChildVariantNumber;
                    treeNumber %= MOD;
                }
            }
        }

        memo.set(rootNum, treeNumber);
        return treeNumber;
    };

    let treeNumber = 0;

    for (const num of nums) {
        treeNumber += getBinaryTreeVariantNumber(num);
        treeNumber %= MOD;
    }

    return treeNumber;
};
// @lc code=end

numFactoredBinaryTrees([2, 4, 5, 10]);
