/*
 * @lc app=leetcode id=3042 lang=cpp
 *
 * [3042] Count Prefix and Suffix Pairs I
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countPrefixSuffixPairs(std::vector<std::string>& words) {
    int count = 0;
    for (int i = 0; i < words.size(); i++) {
      for (int j = i + 1; j < words.size(); j++) {
        count += isPrefixAndSuffix(words[j], words[i]);
      }
    }
    return count;
  }

 private:
  static bool isPrefixAndSuffix(const std::string& word,
                                const std::string& candidate) {
    return isPrefix(word, candidate) && isSuffix(word, candidate);
  }

  static bool isPrefix(const std::string& word,
                       const std::string& prefixCandidate) {
    return word.find(prefixCandidate) == 0;
  }

  static bool isSuffix(const std::string& word,
                       const std::string& suffixCandidate) {
    return word.rfind(suffixCandidate) ==
           (word.size() - suffixCandidate.size());
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::string> words = {"a", "aba", "ababa", "aa"};
  sol.countPrefixSuffixPairs(words);
}
