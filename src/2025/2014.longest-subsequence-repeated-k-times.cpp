/*
 * @lc app=leetcode id=2014 lang=cpp
 *
 * [2014] Longest Subsequence Repeated k Times
 */

#include <array>
#include <memory>
#include <queue>
#include <string>
#include <string_view>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string longestSubsequenceRepeatedK(const std::string& s, const int k) {
    std::array<int, 26> letter_to_freq = {};
    for (const char c : s) {
      letter_to_freq[c - 'a']++;
    }

    std::vector<char> candidate_letters;
    for (int i = letter_to_freq.size() - 1; i >= 0; i--) {
      if (letter_to_freq[i] >= k) {
        candidate_letters.push_back(static_cast<char>(i + 'a'));
      }
    }

    if (candidate_letters.empty()) {
      return "";
    }

    auto result = std::string(1, candidate_letters.front());
    // BFS
    std::queue<std::string> candidate_string_queue;
    for (const char letter : candidate_letters) {
      candidate_string_queue.emplace(1, static_cast<char>(letter));
    }

    while (!candidate_string_queue.empty()) {
      const size_t last_layer_size = candidate_string_queue.size();
      for (int i = 0; i < last_layer_size; i++) {
        const std::string string = candidate_string_queue.front();
        candidate_string_queue.pop();

        for (const char letter : candidate_letters) {
          const std::string candidate_string = string + letter;
          if (IsSubsequenceRepeatKTimes(s, candidate_string, k)) {
            candidate_string_queue.push(candidate_string);
            if (candidate_string.size() > result.size() ||
                candidate_string > result) {
              result = candidate_string;
            }
          }
        }
      }
    }

    return result;
  }

 private:
  static bool IsSubsequenceRepeatKTimes(const std::string_view s,
                                        const std::string_view subsequence,
                                        const int k) {
    int current_repeat_time = 0;
    int current_subsequence_index = 0;
    for (const char c : s) {
      if (c == subsequence[current_subsequence_index]) {
        current_subsequence_index++;
        if (current_subsequence_index == subsequence.size()) {
          current_subsequence_index = 0;
          current_repeat_time++;
          if (current_repeat_time >= k) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
// @lc code=end
