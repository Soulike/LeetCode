/*
 * @lc app=leetcode id=1178 lang=javascript
 *
 * [1178] Number of Valid Words for Each Puzzle
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
const findNumOfValidWords = function (words, puzzles) {
  const aCharCode = 'a'.charCodeAt(0);

  const wordsMask = words.map((word) => {
    let mask = 0;
    for (const letter of word) {
      mask |= 1 << (letter.charCodeAt(0) - aCharCode);
    }
    return mask;
  });

  const puzzlesMaskInfo = puzzles.map((puzzle) => {
    let mask = 0;
    for (const letter of puzzle) {
      mask |= 1 << (letter.charCodeAt(0) - aCharCode);
    }
    return {
      mask,
      requiredMask: 1 << (puzzle[0].charCodeAt(0) - aCharCode),
    };
  });

  return puzzlesMaskInfo.map(({mask, requiredMask}) => {
    let count = 0;
    for (const wordMask of wordsMask) {
      if ((requiredMask & wordMask) !== 0 && (wordMask & mask) === wordMask) {
        count++;
      }
    }
    return count;
  });
};
// @lc code=end
