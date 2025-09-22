/*
 * @lc app=leetcode id=3005 lang=cpp
 *
 * [3005] Count Elements With Maximum Frequency
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxFrequencyElements(const std::vector<int>& nums) {
    std::array<int, 100> freqs = {};
    int max_freq = 0;
    int max_freq_element_count = 0;
    for (const int num : nums) {
      freqs[num - 1]++;
      if (freqs[num - 1] > max_freq) {
        max_freq_element_count = 1;
        max_freq = freqs[num - 1];
      } else if (freqs[num - 1] == max_freq) {
        max_freq_element_count++;
      }
    }
    return max_freq_element_count * max_freq;
  }
};
// @lc code=end
