/*
 * @lc app=leetcode id=2958 lang=cpp
 *
 * [2958] Length of Longest Subarray With at Most K Frequency
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxSubarrayLength(const std::vector<int>& nums, const int k) {
    int left = 0;
    int right = 0;  // excluded
    std::unordered_map<int, int> num_to_freq_in_window;
    int max_window_length = 0;

    while (right < nums.size()) {
      if (num_to_freq_in_window[nums[right]] == k) {
        max_window_length = std::max(max_window_length, right - left);

        while (left < right) {
          left++;
          num_to_freq_in_window[nums[left - 1]]--;
          if (nums[left - 1] == nums[right]) {
            break;
          }
        }
      }

      num_to_freq_in_window[nums[right]]++;
      right++;
    }

    max_window_length = std::max(max_window_length, right - left);

    return max_window_length;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxSubarrayLength({1, 2, 2, 2}, 1);
}
