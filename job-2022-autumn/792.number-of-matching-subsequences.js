/*
 * @lc app=leetcode id=792 lang=javascript
 *
 * [792] Number of Matching Subsequences
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  let result = 0;
  /**
   * @type {Map<string, {wordIndexInWords: number, leadingLetterIndexInWord: number}[]>}
   */
  const leadingLetterToWordInfos = new Map();

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    const wordInfos = leadingLetterToWordInfos.get(word[0]) ?? [];
    wordInfos.push({
      wordIndexInWords: i,
      leadingLetterIndexInWord: 0,
    });

    leadingLetterToWordInfos.set(word[0], wordInfos);
  }

  for (const c of s) {
    const wordInfos = leadingLetterToWordInfos.get(c);

    if (wordInfos !== undefined) {
      leadingLetterToWordInfos.delete(c);

      for (const {
        wordIndexInWords,
        leadingLetterIndexInWord: letterIndexInWord,
      } of wordInfos) {
        const word = words[wordIndexInWords];

        const nextLeadingLetterIndexInWord = letterIndexInWord + 1;
        if (nextLeadingLetterIndexInWord === word.length) {
          result++;
        } else {
          const nextLeadingLetter = word[nextLeadingLetterIndexInWord];

          const nextLeadingLetterWordInfos =
            leadingLetterToWordInfos.get(nextLeadingLetter) ?? [];
          nextLeadingLetterWordInfos.push({
            wordIndexInWords,
            leadingLetterIndexInWord: nextLeadingLetterIndexInWord,
          });
          leadingLetterToWordInfos.set(
            nextLeadingLetter,
            nextLeadingLetterWordInfos,
          );
        }
      }
    }
  }

  return result;
};
// @lc code=end
