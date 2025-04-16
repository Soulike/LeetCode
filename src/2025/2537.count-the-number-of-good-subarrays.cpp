/*
 * @lc app=leetcode id=2537 lang=cpp
 *
 * [2537] Count the Number of Good Subarrays
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long countGood(const std::vector<int>& nums, const int k) {
    size_t left = 0;
    size_t right = 0;

    std::unordered_map<int, int> number_to_count_in_window;
    long long pair_number_in_window = 0;
    long long good_subarray_number = 0;

    while (left < nums.size()) {
      while (right < nums.size() && pair_number_in_window < k) {
        number_to_count_in_window[nums[right]]++;
        pair_number_in_window += number_to_count_in_window[nums[right]] - 1;
        right++;
      }

      if (pair_number_in_window >= k) {
        good_subarray_number += static_cast<long long>(nums.size() - right + 1);
      }

      pair_number_in_window -= number_to_count_in_window[nums[left]] - 1;
      number_to_count_in_window[nums[left]]--;
      left++;
    }

    return good_subarray_number;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countGood({2, 3, 1, 3, 2, 3, 3, 3, 1, 1, 3, 2, 2, 2}, 18);
}
