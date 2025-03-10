/*
 * @lc app=leetcode id=3306 lang=cpp
 *
 * [3306] Count of Substrings Containing Every Vowel and K Consonants II
 */

#include <string>
#include <unordered_map>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  long long countOfSubstrings(const std::string& word, const int k) {
    return countOfSubstringsWithAtLeaseKConsonants(word, k) -
           countOfSubstringsWithAtLeaseKConsonants(word, k + 1);
  }

 private:
  static const inline std::unordered_set<char> vowels = {'a', 'e', 'i', 'o',
                                                         'u'};

  static bool isVowel(const char c) { return vowels.contains(c); }

  static long long countOfSubstringsWithAtLeaseKConsonants(
      const std::string& word,
      const int k) {
    const int kMinWindowSize = k + 5;
    if (word.size() < kMinWindowSize) {
      return 0;
    }

    long long substringCount = 0;
    std::unordered_map<char, int> vowelToCounts;
    int consonantCountInWindow = 0;
    int left = 0;
    int right = 0;

    while (true) {
      if (vowelToCounts.size() < 5 || consonantCountInWindow < k) {
        // We need more letters, expand.

        if (right == word.size()) {
          // Impossible to expand. Break.
          break;
        }

        if (isVowel(word[right])) {
          vowelToCounts[word[right]]++;
        } else {
          consonantCountInWindow++;
        }
        right++;
      } else {
        // [left, right) is a valid window, and can create
        // `word.size() - right` valid substrings.
        substringCount += static_cast<long long>(word.size()) - right + 1;

        // We have discovered all valid substrings starts at `left`. Shrink.
        if (isVowel(word[left])) {
          vowelToCounts[word[left]]--;
          if (vowelToCounts[word[left]] == 0) {
            vowelToCounts.erase(word[left]);
          }
        } else {
          consonantCountInWindow--;
        }
        left++;
      }
    }

    return substringCount;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countOfSubstrings("iqeaouqi", 2);  // 3
}
