/*
 * @lc app=leetcode id=2901 lang=cpp
 *
 * [2901] Longest Unequal Adjacent Groups Subsequence II
 */

#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> getWordsInLongestSubsequence(
      const std::vector<std::string>& words,
      const std::vector<int>& groups) {
    std::vector<WordInfo> dp(words.size());
    for (int i = 0; i < dp.size(); i++) {
      dp[i] = {1, i};
    }

    int longest_sequence_size = 1;
    int longest_sequence_end_index = 0;
    for (int i = 0; i < words.size(); i++) {
      for (int j = i - 1; j >= 0; j--) {
        if (words[i].size() != words[j].size() || groups[i] == groups[j] ||
            !IsHammingDistanceEqualToOne(words[i], words[j])) {
          continue;
        }
        if (dp[i].max_subsequence_size_ < dp[j].max_subsequence_size_ + 1) {
          dp[i].max_subsequence_size_ = dp[j].max_subsequence_size_ + 1;
          dp[i].prev_word_index_ = j;

          if (dp[i].max_subsequence_size_ > longest_sequence_size) {
            longest_sequence_size = dp[i].max_subsequence_size_;
            longest_sequence_end_index = i;
          }
        }
      }
    }
    std::vector<int> longest_sequence_indexes;
    int current_index = longest_sequence_end_index;
    while (current_index != dp[current_index].prev_word_index_) {
      longest_sequence_indexes.push_back(current_index);
      current_index = dp[current_index].prev_word_index_;
    }
    longest_sequence_indexes.push_back(current_index);

    std::vector<std::string> longest_sequence(longest_sequence_size);
    for (int i = 0; i < longest_sequence_size; i++) {
      longest_sequence[i] =
          words[longest_sequence_indexes[longest_sequence_size - i - 1]];
    }
    return longest_sequence;
  }

 private:
  class WordInfo {
   public:
    int max_subsequence_size_ = 1;
    int prev_word_index_ = -1;
  };

  static bool IsHammingDistanceEqualToOne(const std::string& str1,
                                          const std::string& str2) {
    if (str1.size() != str2.size()) {
      return false;
    }

    int hamming_distance = 0;
    for (int i = 0; i < str1.size(); i++) {
      if (str1[i] != str2[i]) {
        hamming_distance++;
        if (hamming_distance > 1) {
          return false;
        }
      }
    }
    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.getWordsInLongestSubsequence({"bdb", "aaa", "ada"}, {2, 1, 3});
}
