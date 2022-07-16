/*
 * @lc app=leetcode id=187 lang=javascript
 *
 * [187] Repeated DNA Sequences
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    if (s.length < 10) return [];

    /**
     * calculate hash for a window
     * map the substring to a 4 radix number
     */

    const nucleotideToNumber = {
        A: 0,
        C: 1,
        G: 2,
        T: 3,
    };
    let left = 0;
    let right = 10;
    let currentHash = 0;

    /** @type {Set<number>} */
    const seenHashes = new Set();
    /** @type {Set<number>} */
    const resultHashes = new Set();
    /** @type {string[]} */
    const result = [];

    for (let i = left; i < right; i++) {
        currentHash = addTail(currentHash, nucleotideToNumber[s[i]]);
    }

    seenHashes.add(currentHash);

    while (right < s.length) {
        currentHash = minusHead(currentHash);

        currentHash = addTail(currentHash, nucleotideToNumber[s[right]]);

        left++;
        right++;

        if (seenHashes.has(currentHash) && !resultHashes.has(currentHash)) {
            result.push(s.slice(left, right));
            resultHashes.add(currentHash);
        }
        seenHashes.add(currentHash);
    }

    return result;
};

const MOD = 4 ** 9;

/**
 * Remove the hightest bit
 * @param {number} num
 * @returns {number}
 */
function minusHead(num) {
    return num % MOD;
}

/**
 * Add to the lowest bit
 * @param {number} num
 * @param {number} tailNum
 * @returns {number}
 */
function addTail(num, tailNum) {
    return num * 4 + tailNum;
}
// @lc code=end
