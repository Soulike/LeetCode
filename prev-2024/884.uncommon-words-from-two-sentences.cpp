/*
 * @lc app=leetcode id=884 lang=cpp
 *
 * [884] Uncommon Words from Two Sentences
 */
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> uncommonFromSentences(const std::string& s1,
                                                 const std::string& s2) {
    std::unordered_map<std::string_view, int> wordToCounts;
    const char SPACE = ' ';

    int currentWordStart = 0;
    for (int i = 1; i <= s1.size(); i++) {
      if (i == s1.size() || s1[i] == SPACE) {
        const std::string_view word(s1.cbegin() + currentWordStart,
                                    s1.cbegin() + i);
        wordToCounts[word]++;
        currentWordStart = i + 1;
      }
    }

    currentWordStart = 0;
    for (int i = 1; i <= s2.size(); i++) {
      if (i == s2.size() || s2[i] == SPACE) {
        const std::string_view word(s2.cbegin() + currentWordStart,
                                    s2.cbegin() + i);
        wordToCounts[word]++;
        currentWordStart = i + 1;
      }
    }

    std::vector<std::string> result;

    for (const auto& wordToCount : wordToCounts) {
      const std::string_view& word = wordToCount.first;
      const int count = wordToCount.second;

      if (count == 1) {
        result.emplace_back(word);
      }
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.uncommonFromSentences("this apple is sweet", "this apple is sour");
}
