/*
 * @lc app=leetcode id=2302 lang=cpp
 *
 * [2302] Count Subarrays With Score Less Than K
 */

#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long countSubarrays(const std::vector<int>& nums, const long long k) {
    int left = 0;
    int right = 0;
    long long current_subarray_sum = 0;
    long long subarray_count = 0;

    while (right < nums.size()) {
      current_subarray_sum += nums[right];
      right++;
      while (current_subarray_sum >= k ||
             current_subarray_sum * (right - left) >= k) {
        current_subarray_sum -= nums[left];
        left++;
      }
      subarray_count += (right - left);
    }
    return subarray_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countSubarrays({1, 1, 1}, 5);
}
