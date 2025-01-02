/*
 * @lc app=leetcode id=2559 lang=cpp
 *
 * [2559] Count Vowel Strings in Ranges
 */

#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> vowelStrings(const std::vector<std::string>& words,
                                const std::vector<std::vector<int>>& queries) {
    std::vector<int> vowelStringPrefixCount(words.size(), 0);
    vowelStringPrefixCount[0] = static_cast<int>(isVowelString(words[0]));

    for (int i = 1; i < words.size(); i++) {
      vowelStringPrefixCount[i] = vowelStringPrefixCount[i - 1] +
                                  static_cast<int>(isVowelString(words[i]));
    }

    std::vector<int> queryResults(queries.size(), -1);
    for (int i = 0; i < queries.size(); i++) {
      const std::vector<int>& query = queries[i];
      const int begin = query[0];
      const int end = query[1];

      queryResults[i] = vowelStringPrefixCount[end] -
                        vowelStringPrefixCount[begin] +
                        static_cast<int>(isVowelString(words[begin]));
    }

    return queryResults;
  }

 private:
  static bool isVowelString(const std::string& str) {
    static const std::unordered_set<char> vowels({'a', 'e', 'i', 'o', 'u'});

    return vowels.contains(str.front()) && vowels.contains(str.back());
  }
};
// @lc code=end
