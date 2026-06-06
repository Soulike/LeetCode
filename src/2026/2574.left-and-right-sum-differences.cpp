/*
 * @lc app=leetcode id=2574 lang=cpp
 *
 * [2574] Left and Right Sum Differences
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> leftRightDifference(const std::vector<int>& nums) {
    const int total_sum = std::accumulate(nums.cbegin(), nums.cend(), 0);
    int left_sum = 0;
    std::vector<int> diff(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      const int right_sum = total_sum - left_sum - nums[i];
      diff[i] = std::abs(left_sum - right_sum);
      left_sum += nums[i];
    }
    return diff;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.leftRightDifference({10, 4, 8, 3});
}
