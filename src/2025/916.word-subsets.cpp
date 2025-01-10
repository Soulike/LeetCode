/*
 * @lc app=leetcode id=916 lang=cpp
 *
 * [916] Word Subsets
 */

#include <array>
#include <cinttypes>
#include <string>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> wordSubsets(std::vector<std::string>& words1,
                                       std::vector<std::string>& words2) {
    const LetterCount requiredLetterCount = getWordsMaxLetterCount(words2);
    std::vector<std::string> universalWords;
    for (const std::string& word : words1) {
      if (isUniversalWord(word, requiredLetterCount)) {
        universalWords.push_back(word);
      }
    }

    return universalWords;
  }

 private:
  using LetterCount = std::array<std::uint_fast8_t, 26>;

  static bool isUniversalWord(const std::string& word,
                              const LetterCount& requiredLetterCount) {
    const LetterCount wordLetterCount = getWordLetterCount(word);

    for (int i = 0; i < 26; i++) {
      if (wordLetterCount[i] < requiredLetterCount[i]) {
        return false;
      }
    }

    return true;
  }

  static LetterCount getWordsMaxLetterCount(
      const std::vector<std::string>& words) {
    LetterCount wordsMaxLetterCount{};
    wordsMaxLetterCount.fill(0);

    for (const std::string& word : words) {
      const LetterCount letterCount = getWordLetterCount(word);
      wordsMaxLetterCount =
          combineLetterCounts(wordsMaxLetterCount, letterCount);
    }

    return wordsMaxLetterCount;
  }

  static LetterCount getWordLetterCount(const std::string& word) {
    LetterCount letterCount{};
    letterCount.fill(0);

    for (char c : word) {
      letterCount[c - 'a']++;
    }

    return letterCount;
  }

  static LetterCount combineLetterCounts(const LetterCount& letterCount1,
                                         const LetterCount& letterCount2) {
    LetterCount maxLetterCount;
    for (int i = 0; i < 26; i++) {
      maxLetterCount[i] = std::max(letterCount1[i], letterCount2[i]);
    }
    return maxLetterCount;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::string> words1 = {"amazon", "apple", "facebook", "google",
                                     "leetcode"};
  std::vector<std::string> words2 = {"l", "e"};
  sol.wordSubsets(words1, words2);
}
